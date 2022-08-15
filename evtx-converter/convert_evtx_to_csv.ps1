
$path_log = "C:\Users\tinch\Desktop\EvtxECmd\Security.evtx"
$evtx_converter = "C:\Users\tinch\Desktop\EvtxECmd\EvtxECmd.exe"

$file_name_with_extension = $path_log.Split("\") | Select-Object -Last 1
$file_name = $file_name_with_extension.Split(".") | Select-Object -First 1 | Out-String
$file = $file_name -replace "`t|`n|`r"

$query = "-f $path_log --csv C:\Users\tinch\Desktop\EvtxECmd --csvf $file.csv"


Start-Process 'cmd' -ArgumentList "/c $evtx_converter $query"