param(
  [string]$ExtractDir = "database/xlsx_extract",
  [string]$OutputPath = "database/criteria-from-workbook.json"
)

$ns = New-Object System.Xml.XmlNamespaceManager((New-Object System.Xml.NameTable))
$ns.AddNamespace("x", "http://schemas.openxmlformats.org/spreadsheetml/2006/main")
$ns.AddNamespace("r", "http://schemas.openxmlformats.org/officeDocument/2006/relationships")
$relNs = New-Object System.Xml.XmlNamespaceManager((New-Object System.Xml.NameTable))
$relNs.AddNamespace("rel", "http://schemas.openxmlformats.org/package/2006/relationships")

$shared = @()
$sharedPath = Join-Path $ExtractDir "xl/sharedStrings.xml"
if (Test-Path $sharedPath) {
  [xml]$sharedXml = Get-Content -Raw -Encoding UTF8 $sharedPath
  foreach ($si in $sharedXml.SelectNodes("//x:si", $ns)) {
    $shared += (($si.SelectNodes(".//x:t", $ns) | ForEach-Object { $_.'#text' }) -join "")
  }
}

[xml]$workbook = Get-Content -Raw -Encoding UTF8 (Join-Path $ExtractDir "xl/workbook.xml")
[xml]$rels = Get-Content -Raw -Encoding UTF8 (Join-Path $ExtractDir "xl/_rels/workbook.xml.rels")
$relMap = @{}
foreach ($rel in $rels.SelectNodes("//rel:Relationship", $relNs)) {
  $relMap[$rel.Id] = $rel.Target
}

function Get-Col([string]$cellRef) { return ($cellRef -replace "\d", "") }

function Get-Value($cell) {
  $type = $cell.t
  if ($type -eq "s") {
    return $shared[[int]$cell.v]
  }
  if ($type -eq "inlineStr") {
    return (($cell.SelectNodes(".//x:t", $script:ns) | ForEach-Object { $_.'#text' }) -join "")
  }
  if ($null -ne $cell.v) { return [string]$cell.v }
  return ""
}

function Get-SheetRows($sheetNamePrefix) {
  $sheet = $workbook.SelectNodes("//x:sheets/x:sheet", $ns) | Where-Object { $_.name -like "$sheetNamePrefix*" } | Select-Object -First 1
  if (-not $sheet) { throw "Cannot find sheet $sheetNamePrefix" }
  $rid = $sheet.GetAttribute("id", "http://schemas.openxmlformats.org/officeDocument/2006/relationships")
  $sheetPath = Join-Path (Join-Path $ExtractDir "xl") $relMap[$rid]
  [xml]$sheetXml = Get-Content -Raw -Encoding UTF8 $sheetPath
  $rows = @()
  foreach ($row in $sheetXml.SelectNodes("//x:sheetData/x:row", $ns)) {
    $obj = [ordered]@{ row = [int]$row.r }
    foreach ($cell in $row.SelectNodes("x:c", $ns)) {
      $obj[(Get-Col $cell.r)] = Get-Value $cell
    }
    $rows += [pscustomobject]$obj
  }
  return @{ sheet = $sheet.name; rows = $rows }
}

function Clean-L1Name([string]$value) {
  return (($value -replace "\[Layer 1\]", "") -replace "\r?\n", " ").Trim()
}

function Get-GroupWeight([string]$row2Value) {
  if ($row2Value -match "(\d+(?:[,.]\d+)?)%") {
    return [double]($matches[1] -replace ",", ".")
  }
  throw "Cannot parse group weight from: $row2Value"
}

$groups = @()
foreach ($prefix in @("Sheet A", "Sheet B", "Sheet C", "Sheet D")) {
  $sheetData = Get-SheetRows $prefix
  $rows = $sheetData.rows
  $title = ($rows | Where-Object { $_.row -eq 1 }).A
  $topCode = $title.Substring(0, 1)
  $topName = ($title -replace "^[A-D]\s*.\s*", "").Trim()
  $topWeight = Get-GroupWeight (($rows | Where-Object { $_.row -eq 2 }).A)

  $currentL1Code = ""
  $currentL1Name = ""
  $currentL1Weight = 0.0
  $criteria = @()

  foreach ($row in ($rows | Where-Object { $_.row -ge 5 })) {
    if ($row.B) { $currentL1Code = [string]$row.B }
    if ($row.C) { $currentL1Name = Clean-L1Name ([string]$row.C) }
    if ($row.G) { $currentL1Weight = [double]([string]$row.G -replace ",", ".") }
    $text = [string]$row.D
    if ($text -match "^\[(?<code>[A-D]\d+\.\d+)\]\s*(?<name>[^\r\n]+)") {
      $criteria += [pscustomobject]@{
        code = $matches.code
        name = $matches.name.Trim()
        description = $text.Trim()
        layer1Code = $currentL1Code
        layer1Name = $currentL1Name
        layer1Weight = $currentL1Weight
        applicableType = [string]$row.E
        reference = [string]$row.I
        source = [string]$row.J
      }
    }
  }

  $criteriaByL1 = $criteria | Group-Object layer1Code
  $l1Total = (($criteriaByL1 | ForEach-Object { [double]$_.Group[0].layer1Weight }) | Measure-Object -Sum).Sum
  foreach ($bucket in $criteriaByL1) {
    $count = [double]$bucket.Count
    foreach ($criterion in $bucket.Group) {
      $normalizedL1Weight = ([double]$criterion.layer1Weight / [double]$l1Total) * 100
      $criterion | Add-Member -NotePropertyName weight -NotePropertyValue ([math]::Round($normalizedL1Weight / $count, 6))
    }
  }

  $groups += [pscustomobject]@{
    code = $topCode
    name = $topName
    weight = $topWeight
    criteria = $criteria
  }
}

$output = [pscustomobject]@{
  name = "Bộ tiêu chí đánh giá NCC CNTT 17062026"
  description = "Import từ workbook Bộ_tiêu_chí_đánh_giá_NCC_CNTT_17062026.xlsx"
  evaluationPeriod = "2026-Q2"
  scaleMin = 1
  scaleMax = 5
  groups = $groups
  ranks = @(
    [pscustomobject]@{ code = "A"; name = "Nhà cung cấp chiến lược"; color = "#16a34a"; minScore = 85; maxScore = 100; sortOrder = 1 },
    [pscustomobject]@{ code = "B"; name = "Nhà cung cấp đủ điều kiện"; color = "#2563eb"; minScore = 70; maxScore = 84.99; sortOrder = 2 },
    [pscustomobject]@{ code = "C"; name = "Cần cải thiện"; color = "#f59e0b"; minScore = 55; maxScore = 69.99; sortOrder = 3 },
    [pscustomobject]@{ code = "D"; name = "Yếu kém"; color = "#dc2626"; minScore = 0; maxScore = 54.99; sortOrder = 4 }
  )
}

$json = $output | ConvertTo-Json -Depth 100
[System.IO.File]::WriteAllText((Resolve-Path ".").Path + "/" + $OutputPath, $json, [System.Text.UTF8Encoding]::new($false))

foreach ($group in $groups) {
  $sum = [math]::Round((($group.criteria | Measure-Object weight -Sum).Sum), 2)
  Write-Output "$($group.code): $($group.name) | topWeight=$($group.weight) | criteria=$($group.criteria.Count) | criterionWeightSum=$sum"
}
