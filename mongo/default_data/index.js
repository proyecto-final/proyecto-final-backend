db.createCollection('logs')
db.createCollection('lines')
db.createCollection('timelineLines')
db.createCollection('timelines')
db.createCollection('vulnerabilities')

//vulnerabilities
db.vulnerabilities.insertMany([
  {
    references: ["https://car.mitre.org/wiki/CAR-2016-04-005"],
    level: "low",
    name: "Admin User Remote Logon",
    isCustom: false
  },
  {
    references: ["https://www.fireeye.com/blog/threat-research/2019/01/bypassing-network-restrictions-through-rdp-tunneling.html"],
    level: "high",
    name: "RDP Login from Localhost",
    isCustom: false
  },
  {
    name: "Password Change on Directory Service Restore Mode (DSRM) Account",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Addition of SID History to Active Directory Object",
    isCustom: false, references: [], level: ''
  },
  {
    name: "RDP Login from Localhost",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Admin User Remote Logon",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Exfiltration and Tunneling Tools Execution",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Remote Service Creation",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Godmode Sigma Rule",
    isCustom: false, references: [], level: ''
  },
  {
    name: "LSASS Memory Access by Tool Named Dump",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Mimikatz Detection LSASS Access",
    isCustom: false, references: [], level: ''
  },
  {
    name: "RDP Sensitive Settings Changed",
    isCustom: false, references: [], level: ''
  },
  {
    name: "RDP Registry Modification",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Netsh Port or Application Allowed",
    isCustom: false, references: [], level: ''
  },
  {
    name: "File or Folder Permissions Modifications",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Changing RDP Port to Non Standard Number",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Outgoing Logon with New Credentials",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Remote Logon with Explicit Credentials",
    isCustom: false, references: [], level: ''
  },
  {
    name: "AD Privileged Users or Groups Reconnaissance",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Rare Schtasks Creations",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Scheduled Task Deletion",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Abused Debug Privilege by Arbitrary Parent Processes",
    isCustom: false, references: [], level: ''
  },
  {
    name: "PsExec Service Execution",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Possible Shim Database Persistence via sdbinst.exe",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Registry Key Creation or Modification for Shim DataBase",
    isCustom: false, references: [], level: ''
  },
  {
    name: "New Shim Database Created in the Default Directory",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Registry Modification to Hidden File Extension",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Scripting in a WMI Consumer",
    isCustom: false, references: [], level: ''
  },
  {
    name: "WMI Event Consumer Created Named Pipe",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Sysmon Configuration Change",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Local Accounts Discovery",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Accessing WinAPI in PowerShell for Credentials Dumping",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Creation of an Executable by an Executable",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Rename Common File to DLL File",
    isCustom: false, references: [], level: ''
  },
  {
    name: "CurrentVersion Autorun Keys Modification",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious In-Memory Module Execution",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Program Location with Network Connections",
    isCustom: false, references: [], level: ''
  },
  {
    name: "KeePass Password Dumping",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Accessing WinAPI in PowerShell. Code Injection",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Remote Thread Creation in Suspicious Targets",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Malicious Named Pipe",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Credentials Dumping Tools Accessing LSASS Memory",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Password Dumper Remote Thread in LSASS",
    isCustom: false, references: [], level: ''
  },
  {
    name: "CobaltStrike Service Installations in Registry",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Encoded FromBase64String",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Redirect Output in CommandLine",
    isCustom: false, references: [], level: ''
  },
  {
    name: "MMC20 Lateral Movement",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Always Install Elevated MSI Spawned Cmd And Powershell",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Active Directory Replication from Non Machine Account",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Possible DC Shadow",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Mimikatz DC Sync",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Bypass UAC Using Event Viewer",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Process Parents",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Sdclt Child Processes",
    isCustom: false, references: [], level: ''
  },
  {
    name: "CMSTP Execution Registry Event",
    isCustom: false, references: [], level: ''
  },
  {
    name: "CMSTP UAC Bypass via COM Object Access",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Remote Thread Created",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Scheduled Task Creation",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Meterpreter or Cobalt Strike Getsystem Service Installation",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Rundll32 Activity",
    isCustom: false, references: [], level: ''
  },
  {
    name: "MSHTA Suspicious Execution 01",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Use of Pcalua For Execution",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Indirect Command Execution",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Code Execution via Pcwutl.dll",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious ftp.exe",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Regsvr32 Anomaly",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Regsvr32 Network Activity",
    isCustom: false, references: [], level: ''
  },
  {
    name: "MSHTA Spwaned by SVCHOST",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Office Security Settings Changed",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Remote PowerShell Session Host Process (WinRM)",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Disable UAC Using Registry",
    isCustom: false, references: [], level: ''
  },
  {
    name: "In-memory PowerShell",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Hiding Files with Attrib.exe",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Rundll32 Script in CommandLine",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Rundll32 Execution Without DLL File",
    isCustom: false, references: [], level: ''
  },
  {
    name: "SquiblyTwo",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Windows Shell File Write to Suspicious Folder",
    isCustom: false, references: [], level: ''
  },
  {
    name: "XSL Script Processing",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Netsh Port Forwarding",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Shells Spawned by Web Servers",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Disable Winevt Event Logging Via Registry",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspect Svchost Activity",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Shadow Copies Creation Using Operating Systems Utilities",
    isCustom: false, references: [], level: ''
  },
  {
    name: "CurrentVersion NT Autorun Keys Modification",
    isCustom: false, references: [], level: ''
  },
  {
    name: "WMI Modules Loaded",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Logon Scripts (UserInitMprLogonScript)",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Script Execution From Temp Folder",
    isCustom: false, references: [], level: ''
  },
  {
    name: "GlobalFlags Registry Persistence Mechanisms",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Listing of Network Connections",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Execution of Systeminfo",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Dumpert Process Dumper",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Windows Defender Threat Detected",
    isCustom: false, references: [], level: ''
  },
  {
    name: "New Service Creation",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Direct Autorun Keys Modification",
    isCustom: false, references: [], level: ''
  },
  {
    name: "PowerShell Writing Startup Shortcuts",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Possible Applocker Bypass",
    isCustom: false, references: [], level: ''
  },
  {
    name: "CurrentControlSet Autorun Keys Modification",
    isCustom: false, references: [], level: ''
  },
  {
    name: "WannaCry Ransomware",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Bitsadmin Download",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Monitoring For Persistence Via BITS",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Pubprn.vbs Proxy Execution",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Cscript Visual Basic Script Execution",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Discover Private Keys",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Query Registry",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Registry Dump of SAM Creds and Secrets",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Automated Collection Command Prompt",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Windows Network Enumeration",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Scan Loop Network",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Network Command",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Common Autorun Keys Modification",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Certutil Command",
    isCustom: false, references: [], level: ''
  },
  {
    name: "MavInject Process Injection",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Interactive AT Job",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Obfuscated Command Line Using Special Unicode Characters",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Copying Sensitive Files with Credential Data",
    isCustom: false, references: [], level: ''
  },
  {
    name: "HH.exe Execution",
    isCustom: false, references: [], level: ''
  },
  {
    name: "HTML Help Shell Spawn",
    isCustom: false, references: [], level: ''
  },
  {
    name: "TrustedPath UAC Bypass Pattern",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Call by Ordinal",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Windows Suspicious Use Of Web Request in CommandLine",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Bitsadmin Job via PowerShell",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Encoded PowerShell Command Line",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Capture a Network Trace with netsh.exe",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Netsh DLL Persistence",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Rundll32 JS RunHTMLApplication Pattern",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Wmiprvse Spawning Process",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Calculator Usage",
    isCustom: false, references: [], level: ''
  },
  {
    name: "UAC Bypass Tool UACMe Akagi",
    isCustom: false, references: [], level: ''
  },
  {
    name: "UAC Bypass Using Disk Cleanup",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Bypass UAC Using DelegateExecute",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Shell Open Registry Keys Manipulation",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Bypass UAC via Fodhelper.exe",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Removal of Potential COM Hijacking Registry Keys",
    isCustom: false, references: [], level: ''
  },
  {
    name: "UAC Bypass Using PkgMgr and DISM",
    isCustom: false, references: [], level: ''
  },
  {
    name: "UAC Bypass Using Consent and Comctl32 - Process",
    isCustom: false, references: [], level: ''
  },
  {
    name: "UAC Bypass Using NTFS Reparse Point - Process",
    isCustom: false, references: [], level: ''
  },
  {
    name: "DLL Load By System Process From Suspicious Locations",
    isCustom: false, references: [], level: ''
  },
  {
    name: "UAC Bypass Using ChangePK and SLUI",
    isCustom: false, references: [], level: ''
  },
  {
    name: "High Integrity Sdclt Process",
    isCustom: false, references: [], level: ''
  },
  {
    name: "UAC Bypass WSReset",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Bypass UAC via WSReset.exe",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Explorer Process Tree Break",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Change PowerShell Policies to an Unsecure Level",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Rundll32 With Suspicious Parent Process",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Lolbins Process Creation with WmiPrvse",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Manipulation of User Computer or Group Security Principals Across AD",
    isCustom: false, references: [], level: ''
  },
  {
    name: "LSASS Access from Program in Suspicious Folder",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Generic Password Dumper Activity on LSASS",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Stop Windows Service",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Net.exe Execution",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Creation Exe for Service with Unquoted Path",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Svchost Process",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Renamed Binary",
    isCustom: false, references: [], level: ''
  },
  {
    name: "EfsPotato Named Pipe",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Accessing WinAPI in PowerShell",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Direct Syscall of NtOpenProcess",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Desktopimgdownldr Command",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Desktopimgdownldr Target File",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Proxy Execution Via Explorer.exe",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Protected Storage Service Access",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Fax Service DLL Search Order Hijack",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Windows Spooler Service Suspicious File Deletion",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Parent in Public Folder Suspicious Process",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Windows PowerShell Web Request",
    isCustom: false, references: [], level: ''
  },
  {
    name: "PsExec Tool Execution",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Mimikatz MemSSP Default Log File Creation",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Hidden Local User Creation",
    isCustom: false, references: [], level: ''
  },
  {
    name: "System File Execution Location Anomaly",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Process Dump via RdrLeakDiag.exe",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious LSASS Process Clone",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Taskmgr as Parent",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Unsigned Image Loaded Into LSASS Process",
    isCustom: false, references: [], level: ''
  },
  {
    name: "DLL Load via LSASS",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Microsoft Office Product Spawning Windows Shell",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Load of Advapi31.dll",
    isCustom: false, references: [], level: ''
  },
  {
    name: "UAC Bypass Using IEInstal - File",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Driver Load from Temp",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Trickbot Malware Activity",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Windows Spooler Service Suspicious Binary Load",
    isCustom: false, references: [], level: ''
  },
  {
    name: "PsExec Service Execution as LOCAL SYSTEM",
    isCustom: false, references: [], level: ''
  },
  {
    name: "DLL Injection with Tracker.exe",
    isCustom: false, references: [], level: ''
  },
  {
    name: "LSASS Memory Dumping",
    isCustom: false, references: [], level: ''
  },
  {
    name: "CreateMiniDump Hacktool",
    isCustom: false, references: [], level: ''
  },
  {
    name: "WSF/JSE/JS/VBA/VBE File Execution",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Remote Desktop Protocol Use Mstsc",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious ZipExec Execution",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Computer Account Name Change CVE-2021-42287",
    isCustom: false, references: [], level: ''
  },
  {
    name: "SMB Create Remote File Admin Share",
    isCustom: false, references: [], level: ''
  },
  {
    name: "KrbRelayUp Attack Pattern",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Plink Remote Forwarding",
    isCustom: false, references: [], level: ''
  },
  {
    name: "LSASS Memory Dump File Creation",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Rare GrantedAccess Flags on LSASS Access",
    isCustom: false, references: [], level: ''
  },
  {
    name: "ServiceDll Modification",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Netsh RDP Port Opening",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Successful Overpass the Hash Attempt",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Reconnaissance Activity",
    isCustom: false, references: [], level: ''
  },
  {
    name: "WMI Persistence - Script Event Consumer",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Whoami Execution",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Meterpreter or Cobalt Strike Getsystem Service Start",
    isCustom: false, references: [], level: ''
  },
  {
    name: "PowerShell as a Service in Registry",
    isCustom: false, references: [], level: ''
  },
  {
    name: "FromBase64String Command Line",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Whoami Execution Anomaly",
    isCustom: false, references: [], level: ''
  },
  {
    name: "UAC Bypass via Event Viewer",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Add Scheduled Command Pattern",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious MSHTA Process Patterns",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Regsvr32 Flags Anomaly",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Hijack Legit RDP Session to Move Laterally",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Execution of Hostname",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Windows Shell Spawning Suspicious Program",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Netsh RDP Port Forwarding",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious WMI Execution",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Userinit Child Process",
    isCustom: false, references: [], level: ''
  },
  {
    name: "WScript or CScript Dropper",
    isCustom: false, references: [], level: ''
  },
  {
    name: "LSASS Process Memory Dump Files",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Rundll32 Without Parameters",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Reg Add RUN Key",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Startup Folder File Write",
    isCustom: false, references: [], level: ''
  },
  {
    name: "New DLL Added to AppInit_DLLs Registry Key",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Bitsadmin Download File with Suspicious Extension",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious DIR Execution",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Process Patterns NTDS.DIT Exfil",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Execution of InstallUtil Without Log",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Mshta JavaScript Execution",
    isCustom: false, references: [], level: ''
  },
  {
    name: "PowerShell Web Download",
    isCustom: false, references: [], level: ''
  },
  {
    name: "UAC Bypass Using Windows Media Player - File",
    isCustom: false, references: [], level: ''
  },
  {
    name: "UAC Bypass Using .NET Code Profiler on MMC",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Wsreset UAC Bypass",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Process Dump via Comsvcs DLL",
    isCustom: false, references: [], level: ''
  },
  {
    name: "PowerShell Credential Prompt",
    isCustom: false, references: [], level: ''
  },
  {
    name: "LSASS Access from Non System Account",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Service Execution",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Shellcode Injection",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Windows Processes Suspicious Parent Directory",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Malicious PowerShell Keywords",
    isCustom: false, references: [], level: ''
  },
  {
    name: "PsExec Service Start",
    isCustom: false, references: [], level: ''
  },
  {
    name: "New or Renamed User Account with '$' in Attribute 'SamAccountName'",
    isCustom: false, references: [], level: ''
  },
  {
    name: "RdrLeakDiag Process Dump",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Program Names",
    isCustom: false, references: [], level: ''
  },
  {
    name: "New Lolbin Process by Office Applications",
    isCustom: false, references: [], level: ''
  },
  {
    name: "MS Office Product Spawning Exe in User Dir",
    isCustom: false, references: [], level: ''
  },
  {
    name: "UAC Bypass Using IEInstal - Process",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Windows Hacktool Imphash",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Run from a Zip File",
    isCustom: false, references: [], level: ''
  },
  {
    name: "WMI Persistence - Script Event Consumer File Write",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Add Scheduled Task From User AppData Temp",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Encoded PowerShell Command Line",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Powershell in Windows Run Keys",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Bitsadmin Download from Suspicious Domain",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Sticky Key Like Backdoor Usage",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Procdump Usage",
    isCustom: false, references: [], level: ''
  },
  {
    name: "PowerShell Web Download and Execution",
    isCustom: false, references: [], level: ''
  },
  {
    name: "PowerShell Download from URL",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Encoded IEX",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious PowerShell Get Current User",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Shells Spawn by SQL Server",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Run Whoami as SYSTEM",
    isCustom: false, references: [], level: ''
  },
  {
    name: "PowerShell Get-Process LSASS in ScriptBlock",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Windows Cmd Delete File",
    isCustom: false, references: [], level: ''
  },
  {
    name: "New RUN Key Pointing to Suspicious Folder",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Script Interpreter Execution From Suspicious Folder",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Mimikatz Command Line",
    isCustom: false, references: [], level: ''
  },
  {
    name: "LSASS Memory Dump",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicius Schtasks From Env Var Folder",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Execution of Powershell with Base64",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Bitsadmin Download to Uncommon Target Folder",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious PowerShell Sub Processes",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Renamed ProcDump",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Process Discovery With Get-Process",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious GrantedAccess Flags on LSASS Access",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious PowerShell Encoded Command Patterns",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Use of Procdump",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Use Remove-Item to Delete File",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Webshell Hacking Activity Patterns",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious Use of Procdump on LSASS",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Suspicious XOR Encoded PowerShell Command Line",
    isCustom: false, references: [], level: ''
  },
  {
    name: "Usage of Sysinternals Tools",
    isCustom: false, references: [], level: ''
  }
])

//log
db.logs.insertMany([
  {
    title: 'log1',
    description: 'log1',
    projectId: 1,
    extension: '.log',
    state:'processed',
    updatedAt: new Date(),
    createdAt: new Date()
  },
  {
    title: 'log2',
    description: 'log2',
    projectId: 1,
    extension: '.log',
    state:'processed',
    updatedAt: new Date(),
    createdAt: new Date()
  },
  {
    title: 'log3',
    description: 'log3',
    projectId: 2,
    extension: '.evtx',
    state:'processed',
    updatedAt: new Date(),
    createdAt: new Date()
  },
  {
    title: 'log4',
    description: 'log4',
    projectId: 1,
    extension: '.evtx',
    state:'processed',
    updatedAt: new Date(),
    createdAt: new Date()
  },
])

//lines

db.lines.insertMany([
  {
    log: db.logs.find({})[0]._id,
    vulnerabilites: [],
    detail: {
      detaile1: 'detail1',
      detaile2: 'detail2'
    },
    raw: 'Soy un log',
    notes: [
      'nota 1','nota 2'
    ],
    timestamp: '2019-02-13T18:01:47.512340Z'
  },
  {
    log: db.logs.find({})[0]._id,
    vulnerabilites: [],
    detail: {
      detaile1: 'detail1',
      detaile2: 'detail2'
    },
    raw: 'Soy un log',
    notes: [
      'nota 1','nota 2'
    ],
    timestamp: '2019-02-13T18:01:47.512340Z'
  },
  {
    log: db.logs.find({})[1]._id,
    vulnerabilites: [],
    detail: {
      detaile1: 'detail1',
      detaile2: 'detail2'
    },
    raw: 'Soy un log',
    notes: [
      'nota 1','nota 2'
    ],
    timestamp: '2019-02-13T18:01:47.512340Z'
  },
  {
    log: db.logs.find({})[1]._id,
    vulnerabilites: [],
    detail: {
      detaile1: 'detail1',
      detaile2: 'detail2'
    },
    raw: 'Soy un log',
    notes: [
      'nota 1','nota 2'
    ],
    timestamp: '2019-02-13T18:01:47.512340Z'
  },
  {
    log: db.logs.find({})[3]._id,
    vulnerabilites: [],
    detail: {
      detaile1: 'detail1',
      detaile2: 'detail2'
    },
    raw: 'Soy un log',
    notes: [
      'nota 1','nota 2'
    ],
    timestamp: '2019-02-13T18:01:47.512340Z'
  },
  {
    log: db.logs.find({})[2]._id,
    vulnerabilites: [],
    detail: {
      detaile1: 'detail1',
      detaile2: 'detail2'
    },
    raw: 'Soy un log',
    notes: [
      'nota 1','nota 2'
    ],
    timestamp: '2019-02-13T18:01:47.512340Z'
  },
])

//timelines

db.timelineLines.insertMany([
  {
    detail: {
      detail1: 'detail1',
      detail2: 'detail2',
      detail3: 'detail3',
    },
    raw: 'raw timelineline',
    line:db.lines.find({})[0]._id,
    tags: [
      'tag1','tag2'
    ],
    vulnerabilites: [],
  },
  {
    detail: {
      detail1: 'detail1',
      detail2: 'detail2',
      detail3: 'detail3',
    },
    raw: 'raw timelineline',
    line:db.lines.find({})[0]._id,
    tags: [
      'tag1','tag2'
    ],
    vulnerabilites: [],
  },
  {
    detail: {
      detail1: 'detail1',
      detail2: 'detail2',
      detail3: 'detail3',
    },
    raw: 'raw timelineline',
    line:db.lines.find({})[1]._id,
    tags: [
      'tag1','tag2'
    ],
    vulnerabilites: [],
  },
  {
    detail: {
      detail1: 'detail1',
      detail2: 'detail2',
      detail3: 'detail3',
    },
    raw: 'raw timelineline',
    line:db.lines.find({})[1]._id,
    tags: [
      'tag1','tag2'
    ],
    vulnerabilites: [],
  },
  {
    detail: {
      detail1: 'detail1',
      detail2: 'detail2',
      detail3: 'detail3',
    },
    raw: 'raw timelineline',
    line:db.lines.find({})[2]._id,
    tags: [
      'tag1','tag2'
    ],
    vulnerabilites: [],
  },
  {
    detail: {
      detail1: 'detail1',
      detail2: 'detail2',
      detail3: 'detail3',
    },
    raw: 'raw timelineline',
    line:db.lines.find({})[2]._id,
    tags: [
      'tag1','tag2'
    ],
    vulnerabilites: [],
  },
  {
    detail: {
      detail1: 'detail1',
      detail2: 'detail2',
      detail3: 'detail3',
    },
    raw: 'raw timelineline',
    line:db.lines.find({})[2]._id,
    tags: [
      'tag1','tag2'
    ],
    vulnerabilites: [],
  }
])


db.timelines.insertMany([
  {
    title: 'timelineTest1',
    description: 'a test timeline',
    projectId: 1,
    log: db.logs.find({})[0]._id,
    lines: [
      db.timelineLines.find({})[0]._id,
      db.timelineLines.find({})[2]._id
    ],
    updatedAt: new Date(),
    createdAt: new Date()
}])
