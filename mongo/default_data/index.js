db.createCollection('logs')
db.createCollection('lines')
db.createCollection('timelines')
db.createCollection('vulnerabilities')

//vulnerabilities
db.vulnerabilities.insertMany([
  {
    isCustom: false, level: "high",
    name: "Password Change on Directory Service Restore Mode (DSRM) Account",
    references: [
      "https://adsecurity.org/?p=1714"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Addition of SID History to Active Directory Object",
    references: [
      "https://adsecurity.org/?p=1772"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "RDP Login from Localhost",
    references: [
      "https://www.fireeye.com/blog/threat-research/2019/01/bypassing-network-restrictions-through-rdp-tunneling.html"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "Admin User Remote Logon",
    references: [
      "https://car.mitre.org/wiki/CAR-2016-04-005"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Exfiltration and Tunneling Tools Execution",
    references: null
  },
  {
    isCustom: false, level: "high",
    name: "Suspicious Plink Remote Forwarding",
    references: [
      "https://www.real-sec.com/2019/04/bypassing-network-restrictions-through-rdp-tunneling/",
      "https://medium.com/@informationsecurity/remote-ssh-tunneling-with-plink-exe-7831072b3d7d"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Remote Service Creation",
    references: [
      "https://drive.google.com/file/d/1lKya3_mLnR3UQuCoiYruO3qgu052_iS_/view"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "LSASS Process Memory Dump Files",
    references: [
      "https://www.google.com/search?q=procdump+lsass",
      "https://medium.com/@markmotig/some-ways-to-dump-lsass-exe-c4a75fdc49bf",
      "https://github.com/elastic/detection-rules/blob/c76a39796972ecde44cb1da6df47f1b6562c9770/rules/windows/credential_access_lsass_memdump_file_created.toml",
      "https://www.whiteoaksecurity.com/blog/attacks-defenses-dumping-lsass-no-mimikatz/",
      "https://github.com/helpsystems/nanodump"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Procdump Usage",
    references: [
      "Internal Research"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "LSASS Memory Dump File Creation",
    references: [
      "https://www.slideshare.net/heirhabarov/hunting-for-credentials-dumping-in-windows-environment"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Godmode Sigma Rule",
    references: null
  },
  {
    isCustom: false, level: "high",
    name: "LSASS Memory Access by Tool Named Dump",
    references: [
      "https://twitter.com/_xpn_/status/1491557187168178176",
      "https://www.ired.team/offensive-security/credential-access-and-credential-dumping/dump-credentials-from-lsass-process-without-mimikatz"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Mimikatz Detection LSASS Access",
    references: [
      "https://onedrive.live.com/view.aspx?resid=D026B4699190F1E6!2843&ithint=file%2cpptx&app=PowerPoint&authkey=!AMvCRTKB_V1J5ow",
      "https://cyberwardog.blogspot.com/2017/03/chronicles-of-threat-hunter-hunting-for_22.html"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Rare GrantedAccess Flags on LSASS Access",
    references: [
      "https://docs.microsoft.com/en-us/windows/win32/procthread/process-security-and-access-rights",
      "https://onedrive.live.com/view.aspx?resid=D026B4699190F1E6!2843&ithint=file%2cpptx&app=PowerPoint&authkey=!AMvCRTKB_V1J5ow",
      "https://cyberwardog.blogspot.com/2017/03/chronicles-of-threat-hunter-hunting-for_22.html",
      "https://www.slideshare.net/heirhabarov/hunting-for-credentials-dumping-in-windows-environment",
      "http://security-research.dyndns.org/pub/slides/FIRST2017/FIRST-2017_Tom-Ueltschi_Sysmon_FINAL_notes.pdf"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "RDP Sensitive Settings Changed",
    references: [
      "https://blog.menasec.net/2019/02/threat-hunting-rdp-hijacking-via.html",
      "https://knowledge.insourcess.com/Supporting_Technologies/Wonderware/Tech_Notes/TN_WW213_How_to_shadow_an_established_RDP_Session_on_Windows_10_Pro",
      "https://twitter.com/SagieSec/status/1469001618863624194?t=HRf0eA0W1YYzkTSHb-Ky1A&s=03",
      "http://etutorials.org/Microsoft+Products/microsoft+windows+server+2003+terminal+services/Chapter+6+Registry/Registry+Keys+for+Terminal+Services/"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "ServiceDll Modification",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1543.003/T1543.003.md#atomic-test-4---tinyturla-backdoor-service-w64time"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "RDP Registry Modification",
    references: [
      "https://threathunterplaybook.com/notebooks/windows/05_defense_evasion/WIN-190407183310.html"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Netsh Port or Application Allowed",
    references: [
      "https://attack.mitre.org/software/S0246/ (Lazarus HARDRAIN)",
      "https://www.operationblockbuster.com/wp-content/uploads/2016/02/Operation-Blockbuster-RAT-and-Staging-Report.pdf"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Netsh RDP Port Opening",
    references: [
      "https://labs.sentinelone.com/sarwent-malware-updates-command-detonation/"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "File or Folder Permissions Modifications",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1222.001/T1222.001.md"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Changing RDP Port to Non Standard Number",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1021.001/T1021.001.md#atomic-test-1---rdp-to-domaincontroller"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "Outgoing Logon with New Credentials",
    references: [
      "https://go.recordedfuture.com/hubfs/reports/mtp-2021-0914.pdf"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Successful Overpass the Hash Attempt",
    references: [
      "https://cyberwardog.blogspot.de/2017/04/chronicles-of-threat-hunter-hunting-for.html"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Suspicious Remote Logon with Explicit Credentials",
    references: [
      "https://drive.google.com/file/d/1lKya3_mLnR3UQuCoiYruO3qgu052_iS_/view"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Reconnaissance Activity",
    references: [
      "https://findingbad.blogspot.de/2017/01/hunting-what-does-it-look-like.html"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "AD Privileged Users or Groups Reconnaissance",
    references: [
      "https://blog.menasec.net/2019/02/threat-hunting-5-detecting-enumeration.html"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "Rare Schtasks Creations",
    references: null
  },
  {
    isCustom: false, level: "low",
    name: "Scheduled Task Deletion",
    references: [
      "https://twitter.com/matthewdunwoody/status/1352356685982146562",
      "https://docs.microsoft.com/en-us/windows/security/threat-protection/auditing/event-4699"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Abused Debug Privilege by Arbitrary Parent Processes",
    references: [
      "https://image.slidesharecdn.com/kheirkhabarovoffzonefinal-181117201458/95/hunting-for-privilege-escalation-in-windows-environment-74-638.jpg"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "PsExec Service Execution",
    references: [
      "https://docs.microsoft.com/en-us/sysinternals/downloads/psexec",
      "https://www.youtube.com/watch?v=ro2QuZTIMBM"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Possible Shim Database Persistence via sdbinst.exe",
    references: [
      "https://www.fireeye.com/blog/threat-research/2017/05/fin7-shim-databases-persistence.html"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Registry Key Creation or Modification for Shim DataBase",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1546.011/T1546.011.md#atomic-test-3---registry-key-creation-andor-modification-events-for-sdb",
      "https://www.fireeye.com/blog/threat-research/2017/05/fin7-shim-databases-persistence.html"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "New Shim Database Created in the Default Directory",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1546.011/T1546.011.md#atomic-test-2---new-shim-database-files-created-in-the-default-shim-database-directory"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "Local Accounts Discovery",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1033/T1033.md"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Whoami Execution Anomaly",
    references: [
      "https://brica.de/alerts/alert/public/1247926/agent-tesla-keylogger-delivered-inside-a-power-iso-daa-archive/",
      "https://app.any.run/tasks/7eaba74e-c1ea-400f-9c17-5e30eee89906/",
      "https://www.youtube.com/watch?v=DsJ9ByX84o4&t=6s"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Whoami Execution",
    references: [
      "https://brica.de/alerts/alert/public/1247926/agent-tesla-keylogger-delivered-inside-a-power-iso-daa-archive/",
      "https://app.any.run/tasks/7eaba74e-c1ea-400f-9c17-5e30eee89906/"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Registry Modification to Hidden File Extension",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1112/T1112.md#atomic-test-1---modify-registry-of-current-user-profile---cmd",
      "https://unit42.paloaltonetworks.com/ransomware-families/",
      "https://www.microsoft.com/en-us/wdsi/threats/malware-encyclopedia-description?name=TrojanSpy%3aMSIL%2fHakey.A"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Suspicious Scripting in a WMI Consumer",
    references: [
      "https://in.security/an-intro-into-abusing-and-identifying-wmi-event-subscriptions-for-persistence/",
      "https://github.com/Neo23x0/signature-base/blob/615bf1f6bac3c1bdc417025c40c073e6c2771a76/yara/gen_susp_lnk_files.yar#L19",
      "https://github.com/RiccardoAncarani/LiquidSnake"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "WMI Persistence - Script Event Consumer File Write",
    references: [
      "https://www.eideon.com/2018-03-02-THL03-WMIBackdoors/"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "WMI Event Consumer Created Named Pipe",
    references: [
      "https://github.com/RiccardoAncarani/LiquidSnake"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "WMI Persistence - Script Event Consumer",
    references: [
      "https://www.eideon.com/2018-03-02-THL03-WMIBackdoors/"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Sysmon Configuration Change",
    references: [
      "https://docs.microsoft.com/en-us/sysinternals/downloads/sysmon"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Suspicious Remote Thread Created",
    references: [
      "Personal research, statistical analysis",
      "https://lolbas-project.github.io"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Accessing WinAPI in PowerShell. Code Injection",
    references: [
      "https://speakerdeck.com/heirhabarov/hunting-for-powershell-abuse"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Accessing WinAPI in PowerShell for Credentials Dumping",
    references: [
      "https://speakerdeck.com/heirhabarov/hunting-for-powershell-abuse"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "Creation of an Executable by an Executable",
    references: [
      "Malware Sandbox"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Rename Common File to DLL File",
    references: [
      "https://twitter.com/ffforward/status/1481672378639912960",
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1036/T1036.md#atomic-test-1---system-file-copied-to-unusual-location"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "CurrentVersion Autorun Keys Modification",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1547.001/T1547.001.md",
      "https://docs.microsoft.com/en-us/sysinternals/downloads/autoruns",
      "https://gist.github.com/GlebSukhodolskiy/0fc5fa5f482903064b448890db1eaf9d"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "Suspicious In-Memory Module Execution",
    references: [
      "https://azure.microsoft.com/en-ca/blog/detecting-in-memory-attacks-with-sysmon-and-azure-security-center/"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Suspicious Program Location with Network Connections",
    references: [
      "https://docs.google.com/spreadsheets/d/17pSTDNpa0sf6pHeRhusvWG6rThciE8CsXTSlDUAZDyo"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "KeePass Password Dumping",
    references: [
      "https://www.cisa.gov/uscert/ncas/alerts/aa20-259a",
      "https://github.com/denandz/KeeFarce",
      "https://github.com/GhostPack/KeeThief"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Remote Thread Creation in Suspicious Targets",
    references: [
      "https://blog.redbluepurple.io/offensive-research/bypassing-injection-detection"
    ]
  },
  {
    isCustom: false, level: "critical",
    name: "Malicious Named Pipe",
    references: [
      "https://securelist.com/wild-neutron-economic-espionage-threat-actor-returns-with-new-tricks/71275/",
      "https://securelist.com/faq-the-projectsauron-apt/75533/",
      "https://www.pwc.co.uk/cyber-security/pdf/cloud-hopper-annex-b-final.pdf",
      "https://www.us-cert.gov/ncas/alerts/TA17-117A",
      "https://www.fireeye.com/blog/threat-research/2020/12/evasive-attacker-leverages-solarwinds-supply-chain-compromises-with-sunburst-backdoor.html",
      "https://thedfirreport.com/2020/06/21/snatch-ransomware/",
      "https://github.com/RiccardoAncarani/LiquidSnake",
      "https://www.accenture.com/us-en/blogs/cyber-defense/turla-belugasturgeon-compromises-government-entity",
      "https://us-cert.cisa.gov/ncas/analysis-reports/ar19-304a",
      "https://download.bitdefender.com/resources/files/News/CaseStudies/study/115/Bitdefender-Whitepaper-PAC-A4-en-EN1.pdf",
      "https://unit42.paloaltonetworks.com/emissary-panda-attacks-middle-east-government-sharepoint-servers/",
      "https://thedfirreport.com/2022/02/21/qbot-and-zerologon-lead-to-full-domain-compromise/"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Credentials Dumping Tools Accessing LSASS Memory",
    references: [
      "https://onedrive.live.com/view.aspx?resid=D026B4699190F1E6!2843&ithint=file%2cpptx&app=PowerPoint&authkey=!AMvCRTKB_V1J5ow",
      "https://cyberwardog.blogspot.com/2017/03/chronicles-of-threat-hunter-hunting-for_22.html",
      "https://www.slideshare.net/heirhabarov/hunting-for-credentials-dumping-in-windows-environment",
      "http://security-research.dyndns.org/pub/slides/FIRST2017/FIRST-2017_Tom-Ueltschi_Sysmon_FINAL_notes.pdf"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Meterpreter or Cobalt Strike Getsystem Service Start",
    references: [
      "https://speakerdeck.com/heirhabarov/hunting-for-privilege-escalation-in-windows-environment",
      "https://blog.cobaltstrike.com/2014/04/02/what-happens-when-i-type-getsystem/"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "Redirect Output in CommandLine",
    references: [
      "https://ss64.com/nt/syntax-redirection.html"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Password Dumper Remote Thread in LSASS",
    references: [
      "https://jpcertcc.github.io/ToolAnalysisResultSheet/details/WCE.htm"
    ]
  },
  {
    isCustom: false, level: "critical",
    name: "CobaltStrike Service Installations in Registry",
    references: [
      "https://www.sans.org/webcasts/tech-tuesday-workshop-cobalt-strike-detection-log-analysis-119395"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "PowerShell as a Service in Registry",
    references: [
      "https://speakerdeck.com/heirhabarov/hunting-for-powershell-abuse"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Mimikatz Command Line",
    references: [
      "https://www.slideshare.net/heirhabarov/hunting-for-credentials-dumping-in-windows-environment",
      "https://tools.thehacker.recipes/mimikatz/modules"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "FromBase64String Command Line",
    references: [
      "https://gist.github.com/Neo23x0/6af876ee72b51676c82a2db8d2cd3639"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Encoded FromBase64String",
    references: null
  },
  {
    isCustom: false, level: "high",
    name: "Wmiprvse Spawning Process",
    references: [
      "https://threathunterplaybook.com/notebooks/windows/02_execution/WIN-190810201010.html"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "MMC20 Lateral Movement",
    references: [
      "https://enigma0x3.net/2017/01/05/lateral-movement-using-the-mmc20-application-com-object/",
      "https://drive.google.com/file/d/1lKya3_mLnR3UQuCoiYruO3qgu052_iS_/view?usp=sharing"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Always Install Elevated MSI Spawned Cmd And Powershell",
    references: [
      "https://image.slidesharecdn.com/kheirkhabarovoffzonefinal-181117201458/95/hunting-for-privilege-escalation-in-windows-environment-50-638.jpg"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "LSASS Memory Dump",
    references: [
      "https://blog.menasec.net/2019/02/threat-hunting-21-procdump-or-taskmgr.html",
      "https://cyberwardog.blogspot.com/2017/03/chronicles-of-threat-hunter-hunting-for_22.html",
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1003.001/T1003.001.md",
      "https://research.splunk.com/endpoint/windows_possible_credential_dumping/"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Suspicious GrantedAccess Flags on LSASS Access",
    references: [
      "https://docs.microsoft.com/en-us/windows/win32/procthread/process-security-and-access-rights",
      "https://onedrive.live.com/view.aspx?resid=D026B4699190F1E6!2843&ithint=file%2cpptx&app=PowerPoint&authkey=!AMvCRTKB_V1J5ow",
      "https://cyberwardog.blogspot.com/2017/03/chronicles-of-threat-hunter-hunting-for_22.html",
      "https://www.slideshare.net/heirhabarov/hunting-for-credentials-dumping-in-windows-environment",
      "http://security-research.dyndns.org/pub/slides/FIRST2017/FIRST-2017_Tom-Ueltschi_Sysmon_FINAL_notes.pdf"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Mimikatz DC Sync",
    references: [
      "https://twitter.com/gentilkiwi/status/1003236624925413376",
      "https://gist.github.com/gentilkiwi/dcc132457408cf11ad2061340dcb53c2",
      "https://blog.blacklanternsecurity.com/p/detecting-dcsync?s=r",
      "https://docs.microsoft.com/en-us/windows/security/threat-protection/auditing/event-4662"
    ]
  },
  {
    isCustom: false, level: "critical",
    name: "Active Directory Replication from Non Machine Account",
    references: [
      "https://threathunterplaybook.com/notebooks/windows/06_credential_access/WIN-180815210510.html"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Possible DC Shadow",
    references: [
      "https://github.com/Neo23x0/sigma/blob/ec5bb710499caae6667c7f7311ca9e92c03b9039/rules/windows/builtin/win_dcsync.yml",
      "https://twitter.com/gentilkiwi/status/1003236624925413376",
      "https://gist.github.com/gentilkiwi/dcc132457408cf11ad2061340dcb53c2",
      "https://blog.alsid.eu/dcshadow-explained-4510f52fc19d"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Bypass UAC Using Event Viewer",
    references: [
      "https://enigma0x3.net/2016/08/15/fileless-uac-bypass-using-eventvwr-exe-and-registry-hijacking/",
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1548.002/T1548.002.md#atomic-test-1---bypass-uac-using-event-viewer-cmd"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Suspicious Process Parents",
    references: [
      "https://twitter.com/x86matthew/status/1505476263464607744?s=12",
      "https://svch0st.medium.com/stats-from-hunting-cobalt-strike-beacons-c17e56255f9b"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "UAC Bypass via Event Viewer",
    references: [
      "https://enigma0x3.net/2016/08/15/fileless-uac-bypass-using-eventvwr-exe-and-registry-hijacking/",
      "https://www.hybrid-analysis.com/sample/e122bc8bf291f15cab182a5d2d27b8db1e7019e4e96bb5cdbd1dfe7446f3f51f?environmentId=100"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Sdclt Child Processes",
    references: [
      "https://github.com/OTRF/detection-hackathon-apt29/issues/6",
      "https://threathunterplaybook.com/evals/apt29/detections/3.B.2_C36B49B5-DF58-4A34-9FE9-56189B9DEFEA.html"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "CMSTP Execution Registry Event",
    references: [
      "https://web.archive.org/web/20190720093911/http://www.endurant.io/cmstp/detecting-cmstp-enabled-code-execution-and-uac-bypass-with-sysmon/"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "CMSTP UAC Bypass via COM Object Access",
    references: [
      "https://web.archive.org/web/20190720093911/http://www.endurant.io/cmstp/detecting-cmstp-enabled-code-execution-and-uac-bypass-with-sysmon/",
      "https://twitter.com/hFireF0X/status/897640081053364225",
      "https://medium.com/falconforce/falconfriday-detecting-uac-bypasses-0xff16-86c2a9107abf",
      "https://github.com/hfiref0x/UACME"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Suspicius Schtasks From Env Var Folder",
    references: [
      "https://www.welivesecurity.com/2022/01/18/donot-go-do-not-respawn/",
      "https://www.joesandbox.com/analysis/514608/0/html#324415FF7D8324231381BAD48A052F85DF04"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "Scheduled Task Creation",
    references: null
  },
  {
    isCustom: false, level: "high",
    name: "Suspicious Add Scheduled Command Pattern",
    references: [
      "https://app.any.run/tasks/512c1352-6380-4436-b27d-bb62f0c020d6/"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Suspicious Add Scheduled Task From User AppData Temp",
    references: [
      "malware analyse https://www.joesandbox.com/analysis/514608/0/html#324415FF7D8324231381BAD48A052F85DF04"
    ]
  },
  {
    isCustom: false, level: "critical",
    name: "Meterpreter or Cobalt Strike Getsystem Service Installation",
    references: [
      "https://speakerdeck.com/heirhabarov/hunting-for-privilege-escalation-in-windows-environment",
      "https://blog.cobaltstrike.com/2014/04/02/what-happens-when-i-type-getsystem/"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Suspicious Rundll32 Activity",
    references: [
      "http://www.hexacorn.com/blog/2017/05/01/running-programs-via-proxy-jumping-on-a-edr-bypass-trampoline/",
      "https://twitter.com/Hexacorn/status/885258886428725250",
      "https://gist.github.com/ryhanson/227229866af52e2d963cf941af135a52",
      "https://twitter.com/nas_bench/status/1433344116071583746"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Suspicious MSHTA Process Patterns",
    references: [
      "https://en.wikipedia.org/wiki/HTML_Application",
      "https://www.echotrail.io/insights/search/mshta.exe",
      "https://app.any.run/tasks/34221348-072d-4b70-93f3-aa71f6ebecad/"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Windows Shell Spawning Suspicious Program",
    references: [
      "https://mgreen27.github.io/posts/2018/04/02/DownloadCradle.html"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "MSHTA Suspicious Execution 01",
    references: [
      "http://blog.sevagas.com/?Hacking-around-HTA-files",
      "https://0x00sec.org/t/clientside-exploitation-in-2018-how-pentesting-has-changed/7356",
      "https://docs.microsoft.com/en-us/dotnet/standard/data/xml/xslt-stylesheet-scripting-using-msxsl-script",
      "https://medium.com/tsscyber/pentesting-and-hta-bypassing-powershell-constrained-language-mode-53a42856c997",
      "https://twitter.com/mattifestation/status/1326228491302563846"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Use of Pcalua For Execution",
    references: [
      "https://lolbas-project.github.io/lolbas/Binaries/Pcalua/",
      "https://pentestlab.blog/2020/07/06/indirect-command-execution/"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "Indirect Command Execution",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1202/T1202.md",
      "https://eqllib.readthedocs.io/en/latest/analytics/884a7ccd-7305-4130-82d0-d4f90bc118b6.html"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Code Execution via Pcwutl.dll",
    references: [
      "https://lolbas-project.github.io/lolbas/Libraries/Pcwutl/",
      "https://twitter.com/harr0ey/status/989617817849876488"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Suspicious ftp.exe",
    references: [
      "https://lolbas-project.github.io/lolbas/Binaries/Ftp/"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Regsvr32 Network Activity",
    references: [
      "https://pentestlab.blog/2017/05/11/applocker-bypass-regsvr32/",
      "https://oddvar.moe/2017/12/13/applocker-case-study-how-insecure-is-it-really-part-1/"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Regsvr32 Anomaly",
    references: [
      "https://subt0x10.blogspot.de/2017/04/bypass-application-whitelisting-script.html",
      "https://app.any.run/tasks/34221348-072d-4b70-93f3-aa71f6ebecad/"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Regsvr32 Flags Anomaly",
    references: [
      "https://twitter.com/sbousseaden/status/1282441816986484737?s=12"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "MSHTA Spwaned by SVCHOST",
    references: [
      "https://codewhitesec.blogspot.com/2018/07/lethalhta.html"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Hijack Legit RDP Session to Move Laterally",
    references: null
  },
  {
    isCustom: false, level: "high",
    name: "Office Security Settings Changed",
    references: [
      "https://twitter.com/inversecos/status/1494174785621819397",
      "https://www.mcafee.com/blogs/other-blogs/mcafee-labs/zloader-with-a-new-infection-technique/",
      "https://securelist.com/scarcruft-surveilling-north-korean-defectors-and-human-rights-activists/105074/"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "Suspicious Execution of Hostname",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1082/T1082.md#atomic-test-6---hostname-discovery-windows",
      "https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/hostname"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Remote PowerShell Session Host Process (WinRM)",
    references: [
      "https://threathunterplaybook.com/notebooks/windows/02_execution/WIN-190511223310.html"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Disable UAC Using Registry",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1548.002/T1548.002.md#atomic-test-8---disable-uac-using-regexe"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "In-memory PowerShell",
    references: [
      "https://adsecurity.org/?p=2921",
      "https://github.com/p3nt4/PowerShdll"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "Hiding Files with Attrib.exe",
    references: null
  },
  {
    isCustom: false, level: "medium",
    name: "Suspicious Rundll32 Script in CommandLine",
    references: [
      "https://gist.github.com/ryhanson/227229866af52e2d963cf941af135a52",
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1218.011/T1218.011.md"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Rundll32 Execution Without DLL File",
    references: [
      "https://twitter.com/mrd0x/status/1481630810495139841?s=12"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "SquiblyTwo",
    references: [
      "https://subt0x11.blogspot.ch/2018/04/wmicexe-whitelisting-bypass-hacking.html",
      "https://twitter.com/mattifestation/status/986280382042595328"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "XSL Script Processing",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1220/T1220.md"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Windows Shell File Write to Suspicious Folder",
    references: [
      "No references"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Netsh Port Forwarding",
    references: [
      "https://www.fireeye.com/blog/threat-research/2019/01/bypassing-network-restrictions-through-rdp-tunneling.html",
      "https://adepts.of0x.cc/netsh-portproxy-code/",
      "https://www.dfirnotes.net/portproxy_detection/"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Netsh RDP Port Forwarding",
    references: [
      "https://www.fireeye.com/blog/threat-research/2019/01/bypassing-network-restrictions-through-rdp-tunneling.html"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Shells Spawned by Web Servers",
    references: null
  },
  {
    isCustom: false, level: "high",
    name: "Disable Winevt Event Logging Via Registry",
    references: [
      "https://twitter.com/WhichbufferArda/status/1543900539280293889",
      "https://github.com/DebugPrivilege/CPP/blob/c39d365617dbfbcb01fffad200d52b6239b2918c/Windows%20Defender/RestoreDefenderConfig.cpp"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Suspect Svchost Activity",
    references: [
      "https://securitybytes.io/blue-team-fundamentals-part-two-windows-processes-759fe15965e2"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Suspicious Svchost Process",
    references: null
  },
  {
    isCustom: false, level: "low",
    name: "Windows Processes Suspicious Parent Directory",
    references: [
      "https://securitybytes.io/blue-team-fundamentals-part-two-windows-processes-759fe15965e2",
      "https://www.carbonblack.com/2014/06/10/screenshot-demo-hunt-evil-faster-than-ever-with-carbon-black/",
      "https://www.13cubed.com/downloads/windows_process_genealogy_v2.pdf",
      "https://attack.mitre.org/techniques/T1036/"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Webshell Hacking Activity Patterns",
    references: [
      "https://youtu.be/7aemGhaE9ds?t=641"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Suspicious PowerShell Encoded Command Patterns",
    references: [
      "https://app.any.run/tasks/b9040c63-c140-479b-ad59-f1bb56ce7a97/"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Suspicious Encoded PowerShell Command Line",
    references: [
      "https://app.any.run/tasks/6217d77d-3189-4db2-a957-8ab239f3e01e"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Suspicious Execution of Powershell with Base64",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1059.001/T1059.001.md#atomic-test-20---powershell-invoke-known-malicious-cmdlets",
      "https://unit42.paloaltonetworks.com/unit42-pulling-back-the-curtains-on-encodedcommand-powershell-attacks/",
      "https://mikefrobbins.com/2017/06/15/simple-obfuscation-with-powershell-using-base64-encoding/"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Shadow Copies Creation Using Operating Systems Utilities",
    references: [
      "https://www.slideshare.net/heirhabarov/hunting-for-credentials-dumping-in-windows-environment",
      "https://www.trustwave.com/en-us/resources/blogs/spiderlabs-blog/tutorial-for-ntds-goodness-vssadmin-wmis-ntdsdit-system/"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Suspicious WMI Execution",
    references: [
      "https://digital-forensics.sans.org/blog/2010/06/04/wmic-draft/",
      "https://www.hybrid-analysis.com/sample/4be06ecd234e2110bd615649fe4a6fa95403979acf889d7e45a78985eb50acf9?environmentId=1",
      "https://blog.malwarebytes.com/threat-analysis/2016/04/rokku-ransomware/"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "CurrentVersion NT Autorun Keys Modification",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1547.001/T1547.001.md",
      "https://docs.microsoft.com/en-us/sysinternals/downloads/autoruns",
      "https://gist.github.com/GlebSukhodolskiy/0fc5fa5f482903064b448890db1eaf9d"
    ]
  },
  {
    isCustom: false, level: "info",
    name: "WMI Modules Loaded",
    references: [
      "https://threathunterplaybook.com/notebooks/windows/02_execution/WIN-190811201010.html"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Suspicious Userinit Child Process",
    references: [
      "https://twitter.com/SBousseaden/status/1139811587760562176"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Logon Scripts (UserInitMprLogonScript)",
    references: [
      "https://attack.mitre.org/techniques/T1037/"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Suspicious Script Execution From Temp Folder",
    references: [
      "https://www.microsoft.com/security/blog/2021/07/13/microsoft-discovers-threat-actor-targeting-solarwinds-serv-u-software-with-0-day-exploit/"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "WScript or CScript Dropper",
    references: null
  },
  {
    isCustom: false, level: "high",
    name: "GlobalFlags Registry Persistence Mechanisms",
    references: [
      "https://oddvar.moe/2018/04/10/persistence-using-globalflags-in-image-file-execution-options-hidden-from-autoruns-exe/"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "Suspicious Listing of Network Connections",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1049/T1049.md#atomic-test-1---system-network-connections-discovery"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "Suspicious Execution of Systeminfo",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1082/T1082.md#atomic-test-1---system-information-discovery",
      "https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/systeminfo"
    ]
  },
  {
    isCustom: false, level: "critical",
    name: "Dumpert Process Dumper",
    references: [
      "https://github.com/outflanknl/Dumpert",
      "https://unit42.paloaltonetworks.com/actors-still-exploiting-sharepoint-vulnerability/"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Rundll32 Without Parameters",
    references: [
      "https://bczyz1.github.io/2021/01/30/psexec.html"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Windows Defender Threat Detected",
    references: [
      "https://docs.microsoft.com/en-us/windows/security/threat-protection/windows-defender-antivirus/troubleshoot-windows-defender-antivirus"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "New Service Creation",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1543.003/T1543.003.md"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Reg Add RUN Key",
    references: [
      "https://app.any.run/tasks/9c0f37bc-867a-4314-b685-e101566766d7/",
      "https://docs.microsoft.com/en-us/windows/win32/setupapi/run-and-runonce-registry-keys"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Direct Autorun Keys Modification",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1547.001/T1547.001.md"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Powershell in Windows Run Keys",
    references: [
      "https://github.com/frack113/atomic-red-team/blob/a9051c38de8a5320b31c7039efcbd3b56cf2d65a/atomics/T1547.001/T1547.001.md#atomic-test-9---systembc-malware-as-a-service-registry"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "Startup Folder File Write",
    references: [
      "https://github.com/OTRF/detection-hackathon-apt29/issues/12",
      "https://threathunterplaybook.com/evals/apt29/detections/5.B.1_611FCA99-97D0-4873-9E51-1C1BA2DBB40D.html"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "PowerShell Writing Startup Shortcuts",
    references: [
      "https://redcanary.com/blog/intelligence-insights-october-2021/",
      "https://github.com/redcanaryco/atomic-red-team/blob/36d49de4c8b00bf36054294b4a1fcbab3917d7c5/atomics/T1547.001/T1547.001.md#atomic-test-7---add-executable-shortcut-link-to-user-startup-folder"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "Possible Applocker Bypass",
    references: [
      "https://github.com/carnal0wnage/ApplicationWhitelistBypassTechniques/blob/b348846a3bd2ff45e3616d63a4c2b4426f84772c/TheList.txt",
      "https://room362.com/post/2014/2014-01-16-application-whitelist-bypass-using-ieexec-dot-exe/",
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1127.001/T1127.001.md"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "CurrentControlSet Autorun Keys Modification",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1547.001/T1547.001.md",
      "https://docs.microsoft.com/en-us/sysinternals/downloads/autoruns",
      "https://gist.github.com/GlebSukhodolskiy/0fc5fa5f482903064b448890db1eaf9d"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "New DLL Added to AppInit_DLLs Registry Key",
    references: [
      "https://eqllib.readthedocs.io/en/latest/analytics/822dc4c5-b355-4df8-bd37-29c458997b8f.html"
    ]
  },
  {
    isCustom: false, level: "critical",
    name: "WannaCry Ransomware",
    references: [
      "https://www.hybrid-analysis.com/sample/ed01ebfbc9eb5bbea545af4d01bf5f1071661840480439c6e5babe8e080e41aa?environmentId=100"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Bitsadmin Download from Suspicious Domain",
    references: [
      "https://blog.netspi.com/15-ways-to-download-a-file/#bitsadmin",
      "https://isc.sans.edu/diary/22264",
      "https://lolbas-project.github.io/lolbas/Binaries/Bitsadmin/"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Bitsadmin Download to Uncommon Target Folder",
    references: [
      "https://blog.netspi.com/15-ways-to-download-a-file/#bitsadmin",
      "https://isc.sans.edu/diary/22264",
      "https://lolbas-project.github.io/lolbas/Binaries/Bitsadmin/"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Bitsadmin Download",
    references: [
      "https://blog.netspi.com/15-ways-to-download-a-file/#bitsadmin",
      "https://isc.sans.edu/diary/22264",
      "https://lolbas-project.github.io/lolbas/Binaries/Bitsadmin/"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Bitsadmin Download File with Suspicious Extension",
    references: [
      "https://blog.netspi.com/15-ways-to-download-a-file/#bitsadmin",
      "https://isc.sans.edu/diary/22264",
      "https://lolbas-project.github.io/lolbas/Binaries/Bitsadmin/"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Monitoring For Persistence Via BITS",
    references: [
      "https://www.fireeye.com/blog/threat-research/2020/10/kegtap-and-singlemalt-with-a-ransomware-chaser.html",
      "http://0xthem.blogspot.com/2014/03/t-emporal-persistence-with-and-schtasks.html",
      "https://isc.sans.edu/diary/Wipe+the+drive+Stealthy+Malware+Persistence+Mechanism+-+Part+1/15394"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Pubprn.vbs Proxy Execution",
    references: [
      "https://lolbas-project.github.io/lolbas/Scripts/Pubprn/"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Cscript Visual Basic Script Execution",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1059.005/T1059.005.md"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Discover Private Keys",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1552.004/T1552.004.md"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "Suspicious DIR Execution",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1217/T1217.md"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "Query Registry",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1012/T1012.md"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Registry Dump of SAM Creds and Secrets",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1003.002/T1003.002.md#atomic-test-1---registry-dump-of-sam-creds-and-secrets"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Automated Collection Command Prompt",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1119/T1119.md",
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1552.001/T1552.001.md"
    ]
  },
  {
    isCustom: false, level: "critical",
    name: "Sticky Key Like Backdoor Usage",
    references: [
      "https://blogs.technet.microsoft.com/jonathantrull/2016/10/03/detecting-sticky-key-backdoors/"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "Windows Network Enumeration",
    references: [
      "https://eqllib.readthedocs.io/en/latest/analytics/b8a94d2f-dc75-4630-9d73-1edc6bd26fff.html",
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1018/T1018.md"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Suspicious Scan Loop Network",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1018/T1018.md",
      "https://ss64.com/nt/for.html",
      "https://ss64.com/ps/foreach-object.htmll"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "Suspicious Network Command",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1016/T1016.md#atomic-test-1---system-network-configuration-discovery-on-windows"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Suspicious PowerShell Sub Processes",
    references: [
      "https://twitter.com/ankit_anubhav/status/1518835408502620162"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Common Autorun Keys Modification",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1547.001/T1547.001.md",
      "https://docs.microsoft.com/en-us/sysinternals/downloads/autoruns",
      "https://gist.github.com/GlebSukhodolskiy/0fc5fa5f482903064b448890db1eaf9d"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Suspicious Certutil Command",
    references: [
      "https://twitter.com/JohnLaTwC/status/835149808817991680",
      "https://blogs.technet.microsoft.com/pki/2006/11/30/basic-crl-checking-with-certutil/",
      "https://www.trustedsec.com/2017/07/new-tool-release-nps_payload/",
      "https://twitter.com/egre55/status/1087685529016193025",
      "https://lolbas-project.github.io/lolbas/Binaries/Certutil/"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "MavInject Process Injection",
    references: [
      "https://twitter.com/gN3mes1s/status/941315826107510784",
      "https://reaqta.com/2017/12/mavinject-microsoft-injector/",
      "https://twitter.com/Hexacorn/status/776122138063409152"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Interactive AT Job",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1053.002/T1053.002.md",
      "https://eqllib.readthedocs.io/en/latest/analytics/d8db43cf-ed52-4f5c-9fb3-c9a4b95a0b56.html"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "LSASS Memory Dumping",
    references: [
      "https://eqllib.readthedocs.io/en/latest/analytics/1e1ef6be-12fc-11e9-8d76-4d6bb837cda4.html",
      "https://eqllib.readthedocs.io/en/latest/analytics/210b4ea4-12fc-11e9-8d76-4d6bb837cda4.html",
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1003/T1003.md"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Suspicious Use of Procdump on LSASS",
    references: [
      "Internal Research"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Renamed ProcDump",
    references: [
      "https://docs.microsoft.com/en-us/sysinternals/downloads/procdump"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "Usage of Sysinternals Tools",
    references: [
      "https://twitter.com/Moti_B/status/1008587936735035392"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Suspicious Use of Procdump",
    references: [
      "Internal Research"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Suspicious Process Patterns NTDS.DIT Exfil",
    references: [
      "https://www.ired.team/offensive-security/credential-access-and-credential-dumping/ntds.dit-enumeration",
      "https://www.n00py.io/2022/03/manipulating-user-passwords-without-mimikatz/",
      "https://pentestlab.blog/tag/ntds-dit/",
      "https://github.com/samratashok/nishang/blob/414ee1104526d7057f9adaeee196d91ae447283e/Gather/Copy-VSS.ps1",
      "https://github.com/zcgonvh/NTDSDumpEx",
      "https://github.com/rapid7/metasploit-framework/blob/d297adcebb5c1df6fe30b12ca79b161deb71571c/data/post/powershell/NTDSgrab.ps1"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Obfuscated Command Line Using Special Unicode Characters",
    references: [
      "https://www.wietzebeukema.nl/blog/windows-command-line-obfuscation",
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1027/T1027.md#atomic-test-6---dlp-evasion-via-sensitive-data-in-vba-macro-over-http"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Copying Sensitive Files with Credential Data",
    references: [
      "https://room362.com/post/2013/2013-06-10-volume-shadow-copy-ntdsdit-domain-hashes-remotely-part-1/",
      "https://www.slideshare.net/heirhabarov/hunting-for-credentials-dumping-in-windows-environment",
      "https://dfironthemountain.wordpress.com/2018/12/06/locked-file-access-using-esentutl-exe/"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "HH.exe Execution",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1218.001/T1218.001.md",
      "https://eqllib.readthedocs.io/en/latest/analytics/b25aa548-7937-11e9-8f5c-d46d6d62a49e.html"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "HTML Help Shell Spawn",
    references: [
      "https://www.trustwave.com/en-us/resources/blogs/spiderlabs-blog/chm-badness-delivers-a-banking-trojan/"
    ]
  },
  {
    isCustom: false, level: "critical",
    name: "TrustedPath UAC Bypass Pattern",
    references: [
      "https://medium.com/tenable-techblog/uac-bypass-by-mocking-trusted-directories-24a96675f6e",
      "https://www.wietzebeukema.nl/blog/hijacking-dlls-in-windows",
      "https://github.com/netero1010/TrustedPath-UACBypass-BOF"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Suspicious Call by Ordinal",
    references: [
      "https://techtalk.pcmatic.com/2017/11/30/running-dll-files-malware-analysis/",
      "https://github.com/Neo23x0/DLLRunner",
      "https://twitter.com/cyb3rops/status/1186631731543236608",
      "https://www.welivesecurity.com/2022/03/01/isaacwiper-hermeticwizard-wiper-worm-targeting-ukraine/"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Windows Suspicious Use Of Web Request in CommandLine",
    references: [
      "https://4sysops.com/archives/use-powershell-to-download-a-file-with-http-https-and-ftp/",
      "https://blog.jourdant.me/post/3-ways-to-download-files-with-powershell"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Suspicious Bitsadmin Job via PowerShell",
    references: [
      "https://eqllib.readthedocs.io/en/latest/analytics/ec5180c9-721a-460f-bddc-27539a284273.html",
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1197/T1197.md"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Suspicious Execution of InstallUtil Without Log",
    references: [
      "https://securelist.com/moonbounce-the-dark-side-of-uefi-firmware/105468/",
      "https://docs.microsoft.com/en-us/dotnet/framework/tools/installutil-exe-installer-tool"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Mshta JavaScript Execution",
    references: [
      "https://eqllib.readthedocs.io/en/latest/analytics/6bc283c4-21f2-4aed-a05c-a9a3ffa95dd4.html",
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1218.005/T1218.005.md"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "PowerShell Web Download",
    references: [
      "https://github.com/VirtualAlllocEx/Payload-Download-Cradles/blob/88e8eca34464a547c90d9140d70e9866dcbc6a12/Download-Cradles.cmd"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "PowerShell Web Download and Execution",
    references: [
      "https://github.com/VirtualAlllocEx/Payload-Download-Cradles/blob/88e8eca34464a547c90d9140d70e9866dcbc6a12/Download-Cradles.cmd"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Suspicious XOR Encoded PowerShell Command Line",
    references: null
  },
  {
    isCustom: false, level: "low",
    name: "Encoded PowerShell Command Line",
    references: [
      "https://speakerdeck.com/heirhabarov/hunting-for-powershell-abuse?slide=65"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "PowerShell Download from URL",
    references: null
  },
  {
    isCustom: false, level: "medium",
    name: "Capture a Network Trace with netsh.exe",
    references: [
      "https://blogs.msdn.microsoft.com/canberrapfe/2012/03/30/capture-a-network-trace-without-installing-anything-capture-a-network-trace-of-a-reboot/"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Suspicious Netsh DLL Persistence",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1546.007/T1546.007.md",
      "https://attack.mitre.org/software/S0108/"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Rundll32 JS RunHTMLApplication Pattern",
    references: [
      "http://hyp3rlinx.altervista.org/advisories/MICROSOFT_WINDOWS_DEFENDER_DETECTION_BYPASS.txt"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Suspicious Calculator Usage",
    references: [
      "https://twitter.com/ItsReallyNick/status/1094080242686312448"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "UAC Bypass Tool UACMe Akagi",
    references: [
      "https://github.com/hfiref0x/UACME"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "UAC Bypass Using Disk Cleanup",
    references: [
      "https://github.com/hfiref0x/UACME"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Shell Open Registry Keys Manipulation",
    references: [
      "https://github.com/hfiref0x/UACME",
      "https://winscripting.blog/2017/05/12/first-entry-welcome-and-uac-bypass/",
      "https://github.com/RhinoSecurityLabs/Aggressor-Scripts/tree/master/UACBypass",
      "https://tria.ge/211119-gs7rtshcfr/behavioral2 [Lokibot sample from Nov 2021]"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Bypass UAC Using DelegateExecute",
    references: [
      "https://docs.microsoft.com/en-us/windows/win32/api/shobjidl_core/nn-shobjidl_core-iexecutecommand",
      "https://devblogs.microsoft.com/oldnewthing/20100312-01/?p=14623",
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1548.002/T1548.002.md#atomic-test-7---bypass-uac-using-sdclt-delegateexecute"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Bypass UAC via Fodhelper.exe",
    references: [
      "https://eqllib.readthedocs.io/en/latest/analytics/e491ce22-792f-11e9-8f5c-d46d6d62a49e.html",
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1548.002/T1548.002.md"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Removal of Potential COM Hijacking Registry Keys",
    references: [
      "https://github.com/OTRF/detection-hackathon-apt29/issues/7",
      "https://threathunterplaybook.com/evals/apt29/detections/3.C.1_22A46621-7A92-48C1-81BF-B3937EB4FDC3.html",
      "https://docs.microsoft.com/en-us/windows/win32/shell/launch",
      "https://docs.microsoft.com/en-us/windows/win32/api/shobjidl_core/nn-shobjidl_core-iexecutecommand",
      "https://docs.microsoft.com/en-us/windows/win32/shell/shell-and-managed-code"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "UAC Bypass Using Windows Media Player - File",
    references: [
      "https://github.com/hfiref0x/UACME"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "UAC Bypass Using PkgMgr and DISM",
    references: [
      "https://github.com/hfiref0x/UACME"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "UAC Bypass Using Consent and Comctl32 - Process",
    references: [
      "https://github.com/hfiref0x/UACME"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "UAC Bypass Using NTFS Reparse Point - Process",
    references: [
      "https://github.com/hfiref0x/UACME"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "UAC Bypass Using .NET Code Profiler on MMC",
    references: [
      "https://github.com/hfiref0x/UACME"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "DLL Load By System Process From Suspicious Locations",
    references: [
      "https://github.com/hackerhouse-opensource/iscsicpl_bypassUAC (Idea)"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Suspicious Driver Load from Temp",
    references: null
  },
  {
    isCustom: false, level: "high",
    name: "UAC Bypass Using ChangePK and SLUI",
    references: [
      "https://mattharr0ey.medium.com/privilege-escalation-uac-bypass-in-changepk-c40b92818d1b",
      "https://github.com/hfiref0x/UACME",
      "https://medium.com/falconforce/falconfriday-detecting-uac-bypasses-0xff16-86c2a9107abf"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "High Integrity Sdclt Process",
    references: [
      "https://github.com/OTRF/detection-hackathon-apt29/issues/6",
      "https://threathunterplaybook.com/evals/apt29/detections/3.B.2_C36B49B5-DF58-4A34-9FE9-56189B9DEFEA.html"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "UAC Bypass WSReset",
    references: [
      "https://lolbas-project.github.io/lolbas/Binaries/Wsreset/",
      "https://github.com/hfiref0x/UACME",
      "https://medium.com/falconforce/falconfriday-detecting-uac-bypasses-0xff16-86c2a9107abf"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Wsreset UAC Bypass",
    references: [
      "https://lolbas-project.github.io/lolbas/Binaries/Wsreset/",
      "https://www.activecyber.us/activelabs/windows-uac-bypass",
      "https://twitter.com/ReaQta/status/1222548288731217921"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Bypass UAC via WSReset.exe",
    references: [
      "https://eqllib.readthedocs.io/en/latest/analytics/532b5ed4-7930-11e9-8f5c-d46d6d62a49e.html"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Explorer Process Tree Break",
    references: [
      "https://twitter.com/CyberRaiju/status/1273597319322058752",
      "https://twitter.com/bohops/status/1276357235954909188?s=12",
      "https://twitter.com/nas_bench/status/1535322450858233858",
      "https://securityboulevard.com/2019/09/deobfuscating-ostap-trickbots-34000-line-javascript-downloader/"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Change PowerShell Policies to an Unsecure Level",
    references: [
      "https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.security/set-executionpolicy?view=powershell-7.1",
      "https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.1",
      "https://adsecurity.org/?p=2604",
      "https://thedfirreport.com/2021/11/01/from-zero-to-domain-admin/"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Encoded IEX",
    references: null
  },
  {
    isCustom: false, level: "medium",
    name: "Rundll32 With Suspicious Parent Process",
    references: [
      "https://redcanary.com/blog/raspberry-robin/"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Process Dump via Comsvcs DLL",
    references: [
      "https://modexp.wordpress.com/2019/08/30/minidumpwritedump-via-com-services-dll/",
      "https://twitter.com/SBousseaden/status/1167417096374050817"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Lolbins Process Creation with WmiPrvse",
    references: [
      "https://thedfirreport.com/2021/03/29/sodinokibi-aka-revil-ransomware/",
      "https://github.com/vadim-hunter/Detection-Ideas-Rules/blob/02bcbfc2bfb8b4da601bb30de0344ae453aa1afe/Threat%20Intelligence/The%20DFIR%20Report/20210329_Sodinokibi_(aka_REvil)_Ransomware.yaml"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Manipulation of User Computer or Group Security Principals Across AD",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1136.002/T1136.002.md#atomic-test-3---create-a-new-domain-account-using-powershell",
      "https://docs.microsoft.com/en-us/dotnet/api/system.directoryservices.accountmanagement?view=dotnet-plat-ext-6.0"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "PowerShell Credential Prompt",
    references: [
      "https://twitter.com/JohnLaTwC/status/850381440629981184",
      "https://t.co/ezOTGy1a1G"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "Suspicious PowerShell Get Current User",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1033/T1033.md#atomic-test-4---user-discovery-with-env-vars-powershell-script",
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1033/T1033.md#atomic-test-5---getcurrent-user-with-powershell-script"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Suspicious Shells Spawn by SQL Server",
    references: null
  },
  {
    isCustom: false, level: "high",
    name: "LSASS Access from Program in Suspicious Folder",
    references: [
      "https://docs.microsoft.com/en-us/windows/win32/procthread/process-security-and-access-rights",
      "https://onedrive.live.com/view.aspx?resid=D026B4699190F1E6!2843&ithint=file%2cpptx&app=PowerPoint&authkey=!AMvCRTKB_V1J5ow",
      "https://cyberwardog.blogspot.com/2017/03/chronicles-of-threat-hunter-hunting-for_22.html",
      "https://www.slideshare.net/heirhabarov/hunting-for-credentials-dumping-in-windows-environment",
      "http://security-research.dyndns.org/pub/slides/FIRST2017/FIRST-2017_Tom-Ueltschi_Sysmon_FINAL_notes.pdf"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Generic Password Dumper Activity on LSASS",
    references: [
      "https://cyberwardog.blogspot.com/2017/03/chronicles-of-threat-hunter-hunting-for_22.html",
      "https://www.slideshare.net/heirhabarov/hunting-for-credentials-dumping-in-windows-environment"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "LSASS Access from Non System Account",
    references: [
      "https://threathunterplaybook.com/notebooks/windows/06_credential_access/WIN-170105221010.html"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Run Whoami as SYSTEM",
    references: [
      "https://speakerdeck.com/heirhabarov/hunting-for-privilege-escalation-in-windows-environment"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "Stop Windows Service",
    references: null
  },
  {
    isCustom: false, level: "low",
    name: "Service Execution",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1569.002/T1569.002.md"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "Net.exe Execution",
    references: [
      "https://pentest.blog/windows-privilege-escalation-methods-for-pentesters/",
      "https://eqllib.readthedocs.io/en/latest/analytics/4d2e7fc1-af0b-4915-89aa-03d25ba7805e.html",
      "https://eqllib.readthedocs.io/en/latest/analytics/e61f557c-a9d0-4c25-ab5b-bbc46bb24deb.html",
      "https://eqllib.readthedocs.io/en/latest/analytics/9b3dd402-891c-4c4d-a662-28947168ce61.html",
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1007/T1007.md#atomic-test-2---system-service-discovery---netexe"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Shellcode Injection",
    references: null
  },
  {
    isCustom: false, level: "high",
    name: "Creation Exe for Service with Unquoted Path",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1574.009/T1574.009.md"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Renamed Binary",
    references: [
      "https://attack.mitre.org/techniques/T1036/",
      "https://mgreen27.github.io/posts/2019/05/12/BinaryRename.html",
      "https://mgreen27.github.io/posts/2019/05/29/BinaryRename2.html"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "EfsPotato Named Pipe",
    references: [
      "https://twitter.com/SBousseaden/status/1429530155291193354?s=20",
      "https://github.com/zcgonvh/EfsPotato"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Malicious PowerShell Keywords",
    references: [
      "https://adsecurity.org/?p=2921"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "Use Remove-Item to Delete File",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1070.004/T1070.004.md",
      "https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.management/Remove-Item?view=powershell-5.1&viewFallbackFrom=powershell-7"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Accessing WinAPI in PowerShell",
    references: [
      "https://speakerdeck.com/heirhabarov/hunting-for-powershell-abuse"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "Suspicious Process Discovery With Get-Process",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1057/T1057.md#atomic-test-3---process-discovery---get-process",
      "https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.management/get-process?view=powershell-7"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "PowerShell Get-Process LSASS in ScriptBlock",
    references: [
      "https://twitter.com/PythonResponder/status/1385064506049630211"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Direct Syscall of NtOpenProcess",
    references: [
      "https://medium.com/falconforce/falconfriday-direct-system-calls-and-cobalt-strike-bofs-0xff14-741fa8e1bdd6"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Suspicious Desktopimgdownldr Command",
    references: [
      "https://labs.sentinelone.com/living-off-windows-land-a-new-native-file-downldr/",
      "https://twitter.com/SBousseaden/status/1278977301745741825"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Suspicious Desktopimgdownldr Target File",
    references: [
      "https://labs.sentinelone.com/living-off-windows-land-a-new-native-file-downldr/",
      "https://twitter.com/SBousseaden/status/1278977301745741825"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "Proxy Execution Via Explorer.exe",
    references: [
      "https://twitter.com/CyberRaiju/status/1273597319322058752"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Protected Storage Service Access",
    references: [
      "https://threathunterplaybook.com/notebooks/windows/06_credential_access/WIN-190620024610.html"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Fax Service DLL Search Order Hijack",
    references: [
      "https://windows-internals.com/faxing-your-way-to-system/"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Windows Spooler Service Suspicious File Deletion",
    references: [
      "https://github.com/hhlxf/PrintNightmare",
      "https://github.com/cube0x0/CVE-2021-1675"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "Windows Cmd Delete File",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1070.004/T1070.004.md"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Parent in Public Folder Suspicious Process",
    references: [
      "https://redcanary.com/blog/blackbyte-ransomware/"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Windows PowerShell Web Request",
    references: [
      "https://4sysops.com/archives/use-powershell-to-download-a-file-with-http-https-and-ftp/",
      "https://blog.jourdant.me/post/3-ways-to-download-files-with-powershell"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "PsExec Tool Execution",
    references: [
      "https://www.jpcert.or.jp/english/pub/sr/ir_research.html",
      "https://jpcertcc.github.io/ToolAnalysisResultSheet"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "PsExec Service Start",
    references: null
  },
  {
    isCustom: false, level: "critical",
    name: "Mimikatz MemSSP Default Log File Creation",
    references: [
      "https://pentestlab.blog/2019/10/21/persistence-security-support-provider/"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "New or Renamed User Account with '$' in Attribute 'SamAccountName'",
    references: null
  },
  {
    isCustom: false, level: "high",
    name: "Hidden Local User Creation",
    references: [
      "https://twitter.com/SBousseaden/status/1387743867663958021"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "System File Execution Location Anomaly",
    references: [
      "https://twitter.com/GelosSnake/status/934900723426439170"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "RdrLeakDiag Process Dump",
    references: [
      "https://www.crowdstrike.com/blog/overwatch-exposes-aquatic-panda-in-possession-of-log-4-shell-exploit-tools/"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Process Dump via RdrLeakDiag.exe",
    references: [
      "https://www.pureid.io/dumping-abusing-windows-credentials-part-1/"
    ]
  },
  {
    isCustom: false, level: "critical",
    name: "Suspicious LSASS Process Clone",
    references: [
      "https://www.matteomalvica.com/blog/2019/12/02/win-defender-atp-cred-bypass/",
      "https://twitter.com/Hexacorn/status/1420053502554951689",
      "https://twitter.com/SBousseaden/status/1464566846594691073?s=20"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Suspicious Program Names",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1560.001/T1560.001.md"
    ]
  },
  {
    isCustom: false, level: "low",
    name: "Taskmgr as Parent",
    references: null
  },
  {
    isCustom: false, level: "medium",
    name: "Unsigned Image Loaded Into LSASS Process",
    references: [
      "https://www.slideshare.net/heirhabarov/hunting-for-credentials-dumping-in-windows-environment"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "DLL Load via LSASS",
    references: [
      "https://blog.xpnsec.com/exploring-mimikatz-part-1/",
      "https://twitter.com/SBousseaden/status/1183745981189427200"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "New RUN Key Pointing to Suspicious Folder",
    references: [
      "https://www.fireeye.com/blog/threat-research/2018/08/fin7-pursuing-an-enigmatic-and-evasive-global-criminal-operation.html"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "New Lolbin Process by Office Applications",
    references: [
      "https://thedfirreport.com/2021/03/29/sodinokibi-aka-revil-ransomware/",
      "https://doublepulsar.com/follina-a-microsoft-office-code-execution-vulnerability-1a47fce5629e",
      "https://github.com/vadim-hunter/Detection-Ideas-Rules/blob/02bcbfc2bfb8b4da601bb30de0344ae453aa1afe/Threat%20Intelligence/The%20DFIR%20Report/20210329_Sodinokibi_(aka_REvil)_Ransomware.yaml",
      "https://github.com/splunk/security_content/blob/develop/detections/endpoint/office_spawning_control.yml"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Microsoft Office Product Spawning Windows Shell",
    references: [
      "https://www.hybrid-analysis.com/sample/465aabe132ccb949e75b8ab9c5bda36d80cf2fd503d52b8bad54e295f28bbc21?environmentId=100",
      "https://mgreen27.github.io/posts/2018/04/02/DownloadCradle.html"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "MS Office Product Spawning Exe in User Dir",
    references: [
      "sha256=23160972c6ae07f740800fa28e421a81d7c0ca5d5cab95bc082b4a986fbac57c",
      "https://blog.morphisec.com/fin7-not-finished-morphisec-spots-new-campaign"
    ]
  },
  {
    isCustom: false, level: "info",
    name: "Suspicious Load of Advapi31.dll",
    references: [
      "https://github.com/hlldz/Phant0m"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "UAC Bypass Using IEInstal - File",
    references: [
      "https://github.com/hfiref0x/UACME"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "UAC Bypass Using IEInstal - Process",
    references: [
      "https://github.com/hfiref0x/UACME"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Trickbot Malware Activity",
    references: [
      "https://twitter.com/swisscom_csirt/status/1331634525722521602?s=20",
      "https://app.any.run/tasks/f74c5157-8508-4ac6-9805-d63fe7b0d399/"
    ]
  },
  {
    isCustom: false, level: "info",
    name: "Windows Spooler Service Suspicious Binary Load",
    references: [
      "https://github.com/hhlxf/PrintNightmare",
      "https://github.com/ly4k/SpoolFool"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "PsExec Service Execution as LOCAL SYSTEM",
    references: [
      "https://docs.microsoft.com/en-us/sysinternals/downloads/psexec"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "DLL Injection with Tracker.exe",
    references: [
      "https://lolbas-project.github.io/lolbas/OtherMSBinaries/Tracker/"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Windows Hacktool Imphash",
    references: [
      "Internal Research"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "CreateMiniDump Hacktool",
    references: [
      "https://ired.team/offensive-security/credential-access-and-credential-dumping/dumping-lsass-passwords-without-mimikatz-minidumpwritedump-av-signature-bypass"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "WSF/JSE/JS/VBA/VBE File Execution",
    references: null
  },
  {
    isCustom: false, level: "medium",
    name: "Remote Desktop Protocol Use Mstsc",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1021.001/T1021.001.md#t1021001---remote-desktop-protocol",
      "https://docs.microsoft.com/en-us/windows-server/administration/windows-commands/mstsc"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Suspicious ZipExec Execution",
    references: [
      "https://twitter.com/SBousseaden/status/1451237393017839616",
      "https://github.com/Tylous/ZipExec"
    ]
  },
  {
    isCustom: false, level: "medium",
    name: "Run from a Zip File",
    references: [
      "https://github.com/redcanaryco/atomic-red-team/blob/f339e7da7d05f6057fdfcdd3742bfcf365fee2a9/atomics/T1027/T1027.md#atomic-test-4---execution-from-compressed-file"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Script Interpreter Execution From Suspicious Folder",
    references: [
      "https://www.virustotal.com/gui/file/91ba814a86ddedc7a9d546e26f912c541205b47a853d227756ab1334ade92c3f"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "Suspicious Computer Account Name Change CVE-2021-42287",
    references: [
      "https://medium.com/@mvelazco/hunting-for-samaccountname-spoofing-cve-2021-42287-and-domain-controller-impersonation-f704513c8a45"
    ]
  },
  {
    isCustom: false, level: "high",
    name: "SMB Create Remote File Admin Share",
    references: [
      "https://github.com/OTRF/ThreatHunter-Playbook/blob/f7a58156dbfc9b019f17f638b8c62d22e557d350/playbooks/WIN-201012004336.yaml",
      "https://securitydatasets.com/notebooks/small/windows/08_lateral_movement/SDWIN-200806015757.html?highlight=create%20file"
    ]
  }
])

//log
db.logs.insertMany([
  {
    title: 'log1',
    description: 'log1',
    projectId: 1,
    extension: '.log',
    state: 'processed',
    updatedAt: new Date(),
    createdAt: new Date()
  },
  {
    title: 'log2',
    description: 'log2',
    projectId: 1,
    extension: '.log',
    state: 'processed',
    updatedAt: new Date(),
    createdAt: new Date()
  },
  {
    title: 'log3',
    description: 'log3',
    projectId: 2,
    extension: '.evtx',
    state: 'processed',
    updatedAt: new Date(),
    createdAt: new Date()
  },
  {
    title: 'log4',
    description: 'log4',
    projectId: 1,
    extension: '.evtx',
    state: 'processed',
    updatedAt: new Date(),
    createdAt: new Date()
  },
])

//lines

db.lines.insertMany([
  {
    log: db.logs.find({})[0]._id,
    index: 1,
    vulnerabilites: [],
    detail: {
      detaile1: 'detail1',
      detaile2: 'detail2'
    },
    raw: 'Soy un log',
    notes: [
      'nota 1', 'nota 2'
    ],
    isSelected: false,
    timestamp: new Date()
  },
  {
    log: db.logs.find({})[0]._id,
    index: 2,
    vulnerabilites: [],
    detail: {
      detaile1: 'detail1',
      detaile2: 'detail2'
    },
    raw: 'Soy un log',
    notes: [
      'nota 1', 'nota 2'
    ],
    isSelected: false,
    timestamp: new Date()
  },
  {
    log: db.logs.find({})[1]._id,
    index: 1,
    vulnerabilites: [],
    detail: {
      detaile1: 'detail1',
      detaile2: 'detail2'
    },
    raw: 'Soy un log',
    notes: [
      'nota 1', 'nota 2'
    ],
    isSelected: false,
    timestamp: new Date()
  },
  {
    log: db.logs.find({})[1]._id,
    index: 2,
    vulnerabilites: [],
    detail: {
      detaile1: 'detail1',
      detaile2: 'detail2'
    },
    raw: 'Soy un log',
    notes: [
      'nota 1', 'nota 2'
    ],
    isSelected: false,
    timestamp: new Date()
  },
  {
    log: db.logs.find({})[3]._id,
    index: 1,
    vulnerabilites: [],
    detail: {
      detaile1: 'detail1',
      detaile2: 'detail2'
    },
    raw: 'Soy un log',
    notes: [
      'nota 1', 'nota 2'
    ],
    isSelected: false,
    timestamp: new Date()
  },
  {
    log: db.logs.find({})[2]._id,
    index: 1,
    vulnerabilites: [],
    detail: {
      detaile1: 'detail1',
      detaile2: 'detail2'
    },
    raw: 'Soy un log',
    notes: [
      'nota 1', 'nota 2'
    ],
    isSelected: false,
    timestamp: new Date()
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
    line: db.lines.find({})[0]._id,
    tags: [
      'tag1', 'tag2'
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
    line: db.lines.find({})[0]._id,
    tags: [
      'tag1', 'tag2'
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
    line: db.lines.find({})[1]._id,
    tags: [
      'tag1', 'tag2'
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
    line: db.lines.find({})[1]._id,
    tags: [
      'tag1', 'tag2'
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
    line: db.lines.find({})[2]._id,
    tags: [
      'tag1', 'tag2'
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
    line: db.lines.find({})[2]._id,
    tags: [
      'tag1', 'tag2'
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
    line: db.lines.find({})[2]._id,
    tags: [
      'tag1', 'tag2'
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
      {
        index: 1,
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
        index: 2,
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
    }
  ],
    updatedAt: new Date(),
    createdAt: new Date()
  }])
