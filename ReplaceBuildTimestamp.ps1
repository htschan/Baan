Param(
    [Parameter(Mandatory=$true)]
    [string]$Workspace,
    [Parameter(Mandatory=$true)]
    [string]$BuildTimestamp,
    [Parameter(Mandatory=$true)]
    [string]$BuildNumber
)
(Get-Content $Workspace/myhomeappconfig.ts) -replace "<buildtimestamp>", "$BuildTimestamp build $BuildNumber" | Set-Content $Workspace/myhomeappconfig.ts