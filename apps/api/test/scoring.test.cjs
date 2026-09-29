const { test } = require('node:test');
const assert = require('node:assert/strict');
const { randomUUID } = require('node:crypto');
const { ScoringService } = require('../dist/common/scoring.service');
const { applicable } = require('../dist/common/annual-scoring');
const { defaultEvaluationConfig } = require('../dist/database/default-evaluation-config');
const scoring = new ScoringService();
function fixture(field = 'Hạ tầng', type = 'Hàng hóa') {
  const config = structuredClone(defaultEvaluationConfig);
  config.groups.forEach(g => { g.id = randomUUID(); g.isActive = true; g.criteria.forEach(c => { c.id = randomUUID(); c.isActive = true; }); });
  config.rankRules.forEach(r => r.isActive = true);
  const criteria = config.groups.flatMap(g => g.criteria).filter(c => applicable(c, field, [type]));
  const items = criteria.filter(c => c.scope === 'supplier').map(c => ({ criterionId:c.id,score:5 }));
  const contract = { code:'HD-1',name:'Hợp đồng kiểm thử',evaluator:'Đơn vị kiểm thử',procurementType:type,items:criteria.filter(c => c.scope === 'contract').map(c => ({ criterionId:c.id,score:5 })) };
  return { config, items, context:{ procurementField:field,contracts:[contract] } };
}
test('source contains all 79 unique criteria including whitespace-prefixed C1 rows', () => {
  assert.deepEqual(defaultEvaluationConfig.groups.map(g => g.criteria.length),[15,14,27,23]);
  assert.equal(new Set(defaultEvaluationConfig.groups.flatMap(g => g.criteria.map(c => c.code))).size,79);
  assert.equal(defaultEvaluationConfig.partners.length,75);
});
test('all maximum and all zero scores across all seven fields and three types', () => {
  for (const field of defaultEvaluationConfig.procurementFields) for (const type of ['Hàng hóa','TV','PTV']) {
    const f=fixture(field,type);
    assert.equal(scoring.calculate(f.config,f.items,f.context).totalScore,100,`${field}/${type}`);
    f.items.forEach(i => i.score=0); f.context.contracts[0].items.forEach(i => i.score=0);
    assert.equal(scoring.calculate(f.config,f.items,f.context).totalScore,0);
  }
});
test('contract performance is an arithmetic mean before annual weighting', () => {
  const f=fixture(); const other=structuredClone(f.context.contracts[0]); other.code='HD-2';
  const cIds=new Set(f.config.groups.find(g => g.code==='C').criteria.map(c => c.id));
  other.items.forEach(i => { if(cIds.has(i.criterionId)) i.score=0; }); f.context.contracts.push(other);
  const result=scoring.calculate(f.config,f.items,f.context);
  assert.equal(result.calculationDetails.performance,50); assert.equal(result.totalScore,80); assert.equal(result.rank.code,'B');
});
test('N/A redistributes within its layer; zero remains in denominator', () => {
  const f=fixture(); const a=f.config.groups[0].criteria.find(c => c.code==='A1.1');
  const item=f.items.find(i => i.criterionId===a.id); item.score=null; item.note='Không phát sinh';
  assert.equal(scoring.calculate(f.config,f.items,f.context).totalScore,100);
  item.score=0; assert.equal(scoring.calculate(f.config,f.items,f.context).totalScore,98.5);
});
test('voluntary ESG D3.2 can be N/A; unrelated D4.2 is not confused with it', () => {
  const f=fixture();const id=f.config.groups[3].criteria.find(c => c.code==='D3.2').id;
  Object.assign(f.items.find(i => i.criterionId===id),{score:null,note:'Chưa tham gia EcoVadis/CDP'});
  assert.equal(scoring.calculate(f.config,f.items,f.context).totalScore,100);
});
test('missing product ESG reduces effective denominator to 90 rather than penalizing consulting', () => {
  const f=fixture('Tư vấn','TV');const result=scoring.calculate(f.config,f.items,f.context);
  assert.equal(result.calculationDetails.productEsg,null);assert.equal(result.calculationDetails.effectiveWeight,90);assert.equal(result.totalScore,100);
});
test('reject missing, duplicate, unknown, fractional and off-rubric answers and unexplained N/A', () => {
  const cases=[f=>f.items.pop(),f=>f.items.push(f.items[0]),f=>f.items.push({criterionId:randomUUID(),score:5}),f=>f.items[0].score=NaN,f=>f.items[0].score=2.5,f=>f.items[0].score=4,f=>f.items[0].score=null];
  for(const modify of cases){const f=fixture();modify(f);assert.throws(()=>scoring.calculate(f.config,f.items,f.context));}
});
test('reject duplicate contracts and contracts with no performance scores', () => {
  const f=fixture();f.context.contracts.push(structuredClone(f.context.contracts[0]));assert.throws(()=>scoring.calculate(f.config,f.items,f.context));
  f.context.contracts.pop();f.context.contracts[0].items.forEach(i=>{i.score=null;i.note='Không phát sinh';});assert.throws(()=>scoring.calculate(f.config,f.items,f.context));
});
test('configured layer weights alter result without flattening layer counts', () => {
  const f=fixture(); const a=f.config.groups[0];
  a.criteria.forEach(c=>c.layer1Weight=c.layer1Code==='A1'?100:0);
  const first=f.items.find(i=>i.criterionId===a.criteria[0].id);first.score=0;
  assert.equal(scoring.calculate(f.config,f.items,f.context).totalScore,92.5);
  a.criteria[0].layer1Weight=50;assert.throws(()=>scoring.validateConfig(f.config));
});
test('rank thresholds cover hundredth boundaries with no gaps', () => {
  const rules=defaultEvaluationConfig.rankRules;
  for(const [score,rank] of [[54.99,'D'],[55,'C'],[69.99,'C'],[70,'B'],[84.99,'B'],[85,'A']]) assert.equal(rules.find(r=>score>=r.minScore&&score<=r.maxScore).code,rank);
});
