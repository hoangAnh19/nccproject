param(
  [string]$ExtractDir = "database/xlsx_extract"
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
    $text = ($si.SelectNodes(".//x:t", $ns) | ForEach-Object { $_.'#text' }) -join ""
    $shared += $text
  }
}

[xml]$workbook = Get-Content -Raw -Encoding UTF8 (Join-Path $ExtractDir "xl/workbook.xml")
[xml]$rels = Get-Content -Raw -Encoding UTF8 (Join-Path $ExtractDir "xl/_rels/workbook.xml.rels")
$relMap = @{}
foreach ($rel in $rels.SelectNodes("//rel:Relationship", $relNs)) {
  $relMap[$rel.Id] = $rel.Target
}

function Get-Col([string]$cellRef) {
  return ($cellRef -replace "\d", "")
}

function Get-Value($cell) {
  $type = $cell.t
  if ($type -eq "s") {
    $idx = [int]$cell.v
    return $shared[$idx]
  }
  if ($type -eq "inlineStr") {
    return (($cell.SelectNodes(".//x:t", $script:ns) | ForEach-Object { $_.'#text' }) -join "")
  }
  if ($null -ne $cell.v) {
    return [string]$cell.v
  }
  return ""
}

foreach ($sheet in $workbook.SelectNodes("//x:sheets/x:sheet", $ns)) {
  $name = $sheet.name
  $rid = $sheet.GetAttribute("id", "http://schemas.openxmlformats.org/officeDocument/2006/relationships")
  $target = $relMap[$rid]
  $sheetPath = Join-Path (Join-Path $ExtractDir "xl") $target
  [xml]$sheetXml = Get-Content -Raw -Encoding UTF8 $sheetPath
  $rows = $sheetXml.SelectNodes("//x:sheetData/x:row", $ns)
  Write-Output "=== SHEET: $name | rows=$($rows.Count) | target=$target"
  foreach ($row in ($rows | Select-Object -First 25)) {
    $values = @{}
    foreach ($cell in $row.SelectNodes("x:c", $ns)) {
      $values[(Get-Col $cell.r)] = Get-Value $cell
    }
    $cols = ($values.Keys | Sort-Object)
    if ($cols.Count -gt 0) {
      $line = ($cols | ForEach-Object { "$_=$($values[$_])" }) -join " | "
      Write-Output "R$($row.r): $line"
    }
  }
}
