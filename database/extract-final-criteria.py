"""Extract the approved workbook without evaluating document instructions.

Usage: python -X utf8 database/extract-final-criteria.py <workbook.xlsx>
Requires openpyxl for read-only source extraction.
"""
import hashlib
import json
import re
import sys
from pathlib import Path
import openpyxl

source = Path(sys.argv[1])
root = Path(__file__).resolve().parents[1]
workbook = openpyxl.load_workbook(source, data_only=False)
fields = ['Hạ tầng', 'Phần mềm/Ứng dụng', 'Sản phẩm công nghệ cao', 'An ninh bảo mật', 'Nền tảng Cloud', 'Tư vấn', 'Bảo trì']

def normalize(value):
    value = str(value or '').strip()
    return {'Sản phẩm trí tuệ nhân tạo AI/Dữ liệu lớn/ML': fields[2], 'AI / Dữ liệu lớn / Machine Learning': fields[2], 'Phần mềm/ Ứng dụng': fields[1], 'Hạ tầng Cloud': fields[4]}.get(value, value)

groups = []
for index, sheet in enumerate(workbook.worksheets[1:5]):
    code = 'ABCD'[index]
    criteria = []
    layer_code = layer_name = ''
    for row in sheet:
        values = [cell.value for cell in row]
        description = str(values[3] or '').strip()
        match = re.match(r'\[([A-D]\d+\.\d+)\]\s*(.*)', description, re.S)
        if not match:
            continue
        if values[1]:
            layer_code, layer_name = str(values[1]).strip(), str(values[2]).strip()
        guidance = str(values[9 if code == 'D' else 6] or '').strip()
        options = sorted({0, *[int(n) for n in re.findall(r'([0-5])\s*đ\s*:', guidance)]})
        if len(options) == 1:
            options = list(range(6))
        criteria.append(dict(code=match[1], name=match[2].split('\n')[0].strip(), description=description,
            layer1Code=layer_code, layer1Name=layer_name, applicableType=str(values[5] or '').strip(),
            applicableFields=[normalize(v) for v in str(values[4]).split(',')], guidance=guidance,
            reference='', source=str(values[10 if code == 'D' else 7] or '').strip(),
            sourceSheet=sheet.title, sourceRow=row[0].row,
            scope='contract' if code == 'C' or layer_code == 'D4' else 'supplier',
            allowedScores=options))
    layers = list(dict.fromkeys(c['layer1Code'] for c in criteria))
    for criterion in criteria:
        layer = criterion['layer1Code']
        criterion['layer1Weight'] = {'D1': 22, 'D2': 24, 'D3': 14, 'D4': 40}[layer] if code == 'D' else 100 / len(layers)
        criterion['weight'] = criterion['layer1Weight'] / sum(c['layer1Code'] == layer for c in criteria)
    groups.append(dict(code=code, name=str(sheet['A1'].value).split('–')[-1].strip(), weight=[15,20,40,25][index], criteria=criteria))

partners = []
field = ''
for row in workbook.worksheets[5].iter_rows(min_row=2, values_only=True):
    if row[1]:
        field = normalize(row[1])
    match = re.fullmatch(r'Tier ([123])', str(row[2] or ''))
    if match:
        partners.append(dict(field=field, tier=int(match[1]), name=str(row[3]).strip()))

config = dict(name='Bộ tiêu chí đánh giá NCC CNTT 14/09/2026',
    description='Bộ tiêu chí chốt sau TGYK 11/09/2026. A/B/C: trọng số Layer 1 bằng nhau (giả định triển khai, có thể cấu hình).',
    version='2026-09-14', scoringMethod='layered', weightsConfirmed=False, evaluationPeriod='2026', scaleMin=0, scaleMax=5,
    sourceFile=source.name, sourceHash=hashlib.sha256(source.read_bytes()).hexdigest(),
    useCriterionWeights=True, groups=groups, procurementFields=fields, partners=partners,
    scoreOptions=[dict(value=i,label=label,sortOrder=i,isActive=True) for i,label in enumerate([
        'Vi phạm nghiêm trọng / Không đáp ứng / Không có minh chứng', 'Không đạt / Không có thông tin',
        'Dưới mức yêu cầu tối thiểu', 'Đạt yêu cầu cơ bản', 'Tốt – Vượt yêu cầu cơ bản', 'Xuất sắc – Vượt trội so với yêu cầu'])],
    rankRules=[dict(code=code,name=name,color=color,minScore=lo,maxScore=hi,sortOrder=i+1) for i,(code,name,color,lo,hi) in enumerate([
        ('A','Nhà cung cấp chiến lược','#16a34a',85,100),('B','Nhà cung cấp đủ điều kiện','#2563eb',70,84.99),
        ('C','Nhà cung cấp cần cải thiện','#f59e0b',55,69.99),('D','Nhà cung cấp yếu kém','#dc2626',0,54.99)])])
encoded = json.dumps(config, ensure_ascii=False, indent=2)
(root / 'database/criteria-final-20260914.json').write_text(encoded+'\n', encoding='utf-8')
(root / 'apps/api/src/database/default-evaluation-config.ts').write_text('export const defaultEvaluationConfig = '+encoded+' as const;\n', encoding='utf-8')
print([(g['code'],len(g['criteria'])) for g in groups], 'partners:', len(partners))
