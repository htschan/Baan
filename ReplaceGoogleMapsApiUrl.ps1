Param(
    [Parameter(Mandatory=$true)]
    [string]$Workspace,
    [Parameter(Mandatory=$true)]
    [string]$ProjectConfigFolder
)
$GoogleMapsApiUrl = Get-Content $ProjectConfigFolder/GoogleMapsApiUrl.txt
(Get-Content $Workspace/src/index.html) -replace "https://maps.googleapis.com/maps/api/js", "$GoogleMapsApiUrl" | Set-Content $Workspace/src/index.html