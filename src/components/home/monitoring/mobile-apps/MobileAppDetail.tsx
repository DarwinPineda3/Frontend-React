import React from 'react';
import { Grid, Box, Chip,  Typography,  Stack } from '@mui/material';
import DashboardCard from 'src/components/shared/DashboardCard';
import Breadcrumb from 'src/components/shared/breadcrumb/Breadcrumb';
import AlphaSuspicionLevel from './MalwareAnalysisAlphaSuspicionLevel';
import MalwareAnalysisAccordion from './MalwareAnalysisAccordion';




const MalwareAnalysisDetail: React.FC<{ malwareAnalysisId: string }> = ({ malwareAnalysisId }) => {

  const analysisReport = {
    id: 1,
    summary: {
      file: "f2e7fcb20146.exe",
      size: 275.0,
      type: "PE32 executable (GUI) Intel 80386, for MS Windows",
      md5: "9f5aaba5a45e58b62cf44460a6e8e7e3",
      sha1: "03532bab162af0e7bb0953f29730a439c0b803fd",
      sha256: "2468722fef139e68cbf0cb1f8f531b9e61abd9cfacd450868015052d5a00fb5d",
      sha512: "17cd4b8d7972f189150f4c4d85d2ff469d02cd51d8f92bbc4c5184917e6f59c5de3fdb709897a665d4a32331bcccbeea0fba8db9faffb020918aae64257c8b9d",
      crc32: "00F3327E",
      ssdeep: "None",
      score: 10
    },
    informationExecution: {
      category: "FILE",
      started: "Oct. 22, 2024, 11:10 p.m.",
      completed: "Oct. 22, 2024, 11:11 p.m.",
      duration: "45 seconds",
      routing: "internet",
      state: "Finished",
      yara: [
        "anti_dbg - Checks if being debugged",
        "win_files_operation - Affect private profile"
      ],
      logs: [
        {
          type: "Analyzer Log",
          log: [
            "2024-10-22 23:10:34,015 [analyzer] DEBUG: Starting analyzer from: C:\\tmpd0os1j",
            "2024-10-22 23:10:34,015 [analyzer] DEBUG: Pipe server name: \\PIPE\\JUqBuioggeRAOFXNMUaQHUpyvux",
            "2024-10-22 23:10:34,015 [analyzer] DEBUG: Log pipe server name: ?\\PIPE\\kIhdBbrUWRTiNjccCXkMychtrJvuIlIu",
            "2024-10-22 23:10:34,328 [analyzer] DEBUG: Started auxiliary module Curtain",
            "2024-10-22 23:10:34,328 [analyzer] DEBUG: Started auxiliary module DbgView",
            "2024-10-22 23:10:34,765 [analyzer] DEBUG: Started auxiliary module Disguise",
            "2024-10-22 23:10:34,983 [analyzer] DEBUG: Loaded monitor into process with pid 512",
            "2024-10-22 23:10:34,983 [analyzer] DEBUG: Started auxiliary module DumpTLSMasterSecrets",
            "2024-10-22 23:10:34,983 [analyzer] DEBUG: Started auxiliary module Human",
            "2024-10-22 23:10:34,983 [analyzer] DEBUG: Started auxiliary module InstallCertificate",
            "2024-10-22 23:10:34,983 [analyzer] DEBUG: Started auxiliary module Reboot",
            "2024-10-22 23:10:35,078 [analyzer] DEBUG: Started auxiliary module RecentFiles",
            "2024-10-22 23:10:35,078 [analyzer] DEBUG: Started auxiliary module Screenshots",
            "2024-10-22 23:10:35,078 [analyzer] DEBUG: Started auxiliary module Sysmon",
            "2024-10-22 23:10:35,078 [analyzer] DEBUG: Started auxiliary module LoadZer0m0n",
            "2024-10-22 23:10:35,203 [lib.api.process] INFO: Successfully executed process from path u'C:\\Users\\ADMINI~1\\AppData\\Local\\Temp\\f2e7fcb20146.exe' with arguments '' and pid 2164",
            "2024-10-22 23:10:35,358 [analyzer] DEBUG: Loaded monitor into process with pid 2164",
            "2024-10-22 23:10:35,905 [analyzer] INFO: Injected into process with pid 820 and name u'MSBuild.exe'",
            "2024-10-22 23:10:36,015 [lib.api.process] ERROR: Failed to dump memory of 32-bit process with pid 820.",
            "2024-10-22 23:10:36,217 [analyzer] DEBUG: Loaded monitor into process with pid 820",
            "2024-10-22 23:10:36,217 [analyzer] INFO: Process with pid 2164 has terminated",
            "2024-10-22 23:10:37,233 [analyzer] INFO: Process with pid 820 has terminated",
            "2024-10-22 23:10:37,233 [analyzer] INFO: Process list is empty, terminating analysis.",
            "2024-10-22 23:10:38,467 [analyzer] INFO: Terminating remaining processes before shutdown.",
            "2024-10-22 23:10:38,467 [analyzer] INFO: Analysis completed."
          ]
        },
        {
          type: "Cuckoo Log",
          log: [
            "2024-10-22 23:10:45,528 [cuckoo.core.scheduler] INFO: Task #5335245: acquired machine win7x6429 (label=win7x6429)",
            "2024-10-22 23:10:45,528 [cuckoo.core.resultserver] DEBUG: Now tracking machine 192.168.168.229 for task #5335245",
            "2024-10-22 23:10:45,899 [cuckoo.auxiliary.sniffer] INFO: Started sniffer with PID 3190566 (interface=vboxnet0, host=192.168.168.229)",
            "2024-10-22 23:10:46,378 [cuckoo.machinery.virtualbox] DEBUG: Starting vm win7x6429",
            "2024-10-22 23:10:47,094 [cuckoo.machinery.virtualbox] DEBUG: Restoring virtual machine win7x6429 to vmcloak",
            "2024-10-22 23:11:08,838 [cuckoo.core.guest] INFO: Starting analysis #5335245 on guest (id=win7x6429, ip=192.168.168.229)",
            "2024-10-22 23:11:09,845 [cuckoo.core.guest] DEBUG: win7x6429: not ready yet",
            "2024-10-22 23:11:14,879 [cuckoo.core.guest] INFO: Guest is running Cuckoo Agent 0.10 (id=win7x6429, ip=192.168.168.229)",
            "2024-10-22 23:11:14,957 [cuckoo.core.guest] DEBUG: Uploading analyzer to guest (id=win7x6429, ip=192.168.168.229, monitor=latest, size=6660546)",
            "2024-10-22 23:11:16,181 [cuckoo.core.resultserver] DEBUG: Task #5335245: live log analysis.log initialized.",
            "2024-10-22 23:11:17,116 [cuckoo.core.resultserver] DEBUG: Task #5335245 is sending a BSON stream",
            "2024-10-22 23:11:17,490 [cuckoo.core.resultserver] DEBUG: Task #5335245 is sending a BSON stream",
            "2024-10-22 23:11:18,288 [cuckoo.core.resultserver] DEBUG: Task #5335245 is sending a BSON stream",
            "2024-10-22 23:11:18,431 [cuckoo.core.resultserver] DEBUG: Task #5335245: File upload for 'shots/0001.jpg'",
            "2024-10-22 23:11:18,452 [cuckoo.core.resultserver] DEBUG: Task #5335245 uploaded file length: 133438",
            "2024-10-22 23:11:20,547 [cuckoo.core.resultserver] DEBUG: Task #5335245: File upload for 'curtain/1729631438.34.curtain.log'",
            "2024-10-22 23:11:20,553 [cuckoo.core.resultserver] DEBUG: Task #5335245 uploaded file length: 36",
            "2024-10-22 23:11:20,661 [cuckoo.core.resultserver] DEBUG: Task #5335245: File upload for 'procdump/1729631438.34/procdump.log'",
            "2024-10-22 23:11:20,667 [cuckoo.core.resultserver] DEBUG: Task #5335245 uploaded file length: 198",
            "2024-10-22 23:11:20,789 [cuckoo.core.resultserver] DEBUG: Task #5335245: File upload for 'shots/0002.jpg'",
            "2024-10-22 23:11:20,791 [cuckoo.core.resultserver] DEBUG: Task #5335245 uploaded file length: 136065",
            "2024-10-22 23:11:21,208 [cuckoo.core.resultserver] DEBUG: Task #5335245: File upload for 'shots/0003.jpg'",
            "2024-10-22 23:11:21,210 [cuckoo.core.resultserver] DEBUG: Task #5335245 uploaded file length: 145042",
            "2024-10-22 23:11:23,453 [cuckoo.core.resultserver] DEBUG: Task #5335245: File upload for 'shots/0004.jpg'",
            "2024-10-22 23:11:23,455 [cuckoo.core.resultserver] DEBUG: Task #5335245 uploaded file length: 142968"
          ]
        }
      ]
    },

  };
  const signatures = [
    {
      title: "Checks if process is being debugged by a debugger",
      events: 2,
      type: "Info",
      table: {
        headers: ["Time & API", "Arguments", "Status", "Return", "Repeated"],
        rows: [
          {
            api: "IsDebuggerPresent",
            time: "Oct. 23, 2024, 12:10 a.m.",
            arguments: "",
            status: 1,
            return: 1,
            repeated: 1
          },
          {
            api: "IsDebuggerPresent",
            time: "Oct. 23, 2024, 12:10 a.m.",
            arguments: "",
            status: 1,
            return: 1,
            repeated: 0
          },
          {
            api: "IsDebuggerPresent",
            time: "Oct. 23, 2024, 12:10 a.m.",
            arguments: "",
            status: 1,
            return: 1,
            repeated: 0
          },
          {
            api: "IsDebuggerPresent",
            time: "Oct. 23, 2024, 12:10 a.m.",
            arguments: "",
            status: 1,
            return: 1,
            repeated: 0
          }
        ]
      }
    },
    {
      title: "Queries for the computername",
      events: 2,
      type: "Info",
      table: {
        headers: ["Time & API", "Arguments", "Status", "Return", "Repeated"],
        rows: [
          {
            api: "GetComputerNameA",
            time: "Oct. 23, 2024, 12:10 a.m.",
            arguments: "computer_name: RAWJDBQVXIMOE",
            status: 8,
            return: 1,
            repeated: 0
          },
          {
            api: "GetComputerNameW",
            time: "Oct. 23, 2024, 12:10 a.m.",
            arguments: "computer_name: RAWJDBQVXIMOE",
            status: 3,
            return: 1,
            repeated: 0
          }
        ]
      }
    },
    {
      title:
        "Allocates execute permission to another process indicative of possible code injection",
      events: 2,
      type: "Danger",
      table: {
        headers: ["Time & API", "Arguments", "Status", "Return", "Repeated"],
        rows: [
          {
            api: "NtAllocateVirtualMemory",
            time: "Oct. 23, 2024, 12:10 a.m.",
            arguments:
              "NtAllocateVirtualMemory arguments process_identifier: 820",
            status: 1,
            return: 0,
            repeated: 0
          }
        ]
      }
    },
    {
      title:
        "Potential code injection by writing to the memory of another process",
      events: 2,
      type: "Danger",
      table: {
        headers: [
          "Time & API",
          "process",
          "Arguments",
          "Status",
          "Return",
          "Repeated"
        ],
        rows: [
          {
            api: "NtAllocateVirtualMemory",
            time: "Oct. 23, 2024, 12:10 a.m.",
            process:
              "Process 2164 called NtSetContextThread to modify thread in remote process 820",
            arguments:
              "NtAllocateVirtualMemory arguments process_identifier: 820",
            status: 1,
            return: 0,
            repeated: 0
          }
        ]
      }
    },
    {
      title:
        "The binary likely contains encrypted or compressed data indicative of a packer",
      events: 2,
      type: "Warning",
      table: {
        headers: ["section", "entropy", "Description"],
        rows: [
          {
            section:
              "{u'size_of_data': u'0x0000f800', u'virtual_address': u'0x00032000', u'entropy': 7.834603186197649, u'name': u'.data', u'virtual_size': u'0x000106c4'}",
            entropy: 7.8346031862,
            description: "A section with a high entropy has been found"
          },
          {
            section: "",
            entropy: 0.226691042048,
            description: "Overall entropy of this PE file is high"
          }
        ]
      }
    },
    
    {
      title: "Yara rules detected for file",
      events: 2,
      type: "Info",
      table: {
        headers: ["Description", "rule"],
        rows: [
          {
            description: "Checks if being debugged",
            rule: "anti_dbg"
          },
          {
            description: "Affect private profile",
            rule: "win_files_operation"
          }
        ]
      }
    },
    {
      title: "The executable contains unknown PE section names indicative of a packer (could be a false positive)",
      events: 1,
      type: "Info",
      table: {
        headers: ["section"],
        rows: [
          {
            value: ".AAA"
          }
        ]
      }
    },
    {
      title: "Checks if process is being debugged by a debugger",
      events: 2,
      type: "Info",
      table: {
        headers: ["Time & API", "Arguments", "Status", "Return", "Repeated"],
        rows: [
          {
            api: "IsDebuggerPresent",
            time: "Oct. 23, 2024, 12:10 a.m.",
            arguments: "",
            status: 1,
            return: 1,
            repeated: 0
          },
          {
            api: "IsDebuggerPresent",
            time: "Oct. 23, 2024, 12:10 a.m.",
            arguments: "",
            status: 1,
            return: 1,
            repeated: 0
          },
          {
            api: "IsDebuggerPresent",
            time: "Oct. 23, 2024, 12:10 a.m.",
            arguments: "",
            status: 1,
            return: 1,
            repeated: 0
          },
          {
            api: "IsDebuggerPresent",
            time: "Oct. 23, 2024, 12:10 a.m.",
            arguments: "",
            status: 1,
            return: 1,
            repeated: 0
          }
        ]
      }
    },
    {
      title: "One or more processes crashed",
      events: 2,
      type: "Info",
      table: {
        headers: ["Time & API", "Arguments", "Status", "Return", "Repeated"],
        rows: [
          {
            api: "__exception__",
            time: "Oct. 23, 2024, 12:10 a.m.",
            arguments:
              "stacktrace:\n  <pre>f2e7fcb20146+0x560b @ 0x2560b</pre>\n  <br>\n  exception.symbol: asd\n  <br>\n  exception.exception_code: 0xc0000005\n  <br>\n  exception.address: 0x0\n  <br>\n  registers.esp: 8780980\n  <br>\n  registers.edi: 4254654\n  <br>\n  registers.eax: 1\n  <br>\n  registers.ebp: 8781036\n  <br>\n  registers.edx: 2130553844\n  <br>\n  registers.ebx: 80\n  <br>\n  registers.esi: 4718592\n  <br>\n  registers.ecx: 3635871744\n",
            status: 1,
            return: 1,
            repeated: 0
          },
          {
            api: "__exception__",
            time: "Oct. 23, 2024, 12:10 a.m.",
            arguments:
              "stacktrace:\n f2e7fcb20146+0x6981 @ 0x26981\n  f2e7fcb20146+0x1348 @ 0x21348\n  f2e7fcb20146+0x5764 @ 0x25764\n  f2e7fcb20146+0x96b7 @ 0x296b7\n  BaseThreadInitThunk+0x12 VerifyConsoleIoHandle-0xb3 kernel32+0x133aa @ 0x766233aa\n  RtlInitializeExceptionChain+0x63 RtlAllocateActivationContextStack-0xa5 ntdll+0x39f72 @ 0x77139f72\n  RtlInitializeExceptionChain+0x36 RtlAllocateActivationContextStack-0xd2 ntdll+0x39f45 @ 0x77139f45\n\nexception.instruction_r: c9 c2 10 00 cc cc cc cc cc 8b ff 55 8b ec 56 8b\nexception.symbol: RaiseException+0x58 CloseHandle-0x9 kernelbase+0xc41f\nexception.instruction: leave\nexception.module: KERNELBASE.dll\nexception.exception_code: 0xc0000005\nexception.offset: 50207\nexception.address: 0x761ac41f\nregisters.esp: 3274268\nregisters.edi: 3274472\nregisters.eax: 3274268\nregisters.ebp: 3274348\nregisters.edx: 0\nregisters.ebx: 2130567168\nregisters.esi: 5157676\nregisters.ecx: 2",
            status: 1,
            return: 1,
            repeated: 0
          }
        ]
      }
    }
  ];

  const orderedSignatures = orderSignatures(signatures);

  const mockDate = new Date('2024-09-23T10:20:30Z');
  

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} xl={12}>
      <Breadcrumb title={analysisReport.summary.file}>
          <Box display="flex" flexWrap="wrap" gap={1} mb={3}>
            <Chip label={`Score: ${analysisReport.summary.score}`} color="secondary" variant="outlined" />
            <Chip label={`Category: ${analysisReport.informationExecution.category}`} color="info" variant="outlined" />
            <Chip label={`Date: ${mockDate.toLocaleString()}`} color="primary" variant="outlined" />
          </Box>
        </Breadcrumb>
      </Grid>
      <Grid item xs={12} xl={6}>
        <DashboardCard title="Malware Analisys" subtitle="Analysis Malware Detail">
          <Box display="flex" flexDirection="column" gap={2} mt={1}>

            <AlphaSuspicionLevel score={analysisReport.summary.score} />
            <Box>
              <Stack
                direction="row"
                spacing={2}
                mb={1}
                justifyContent="space-between"
                alignItems="center"
              >
              </Stack>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                State:
              </Typography>
              <Typography variant="body2">{analysisReport.informationExecution.state}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Started:
              </Typography>
              <Typography variant="body2">{analysisReport.informationExecution.started}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
              Completed:
              </Typography>
              <Typography variant="body2">{analysisReport.informationExecution.completed}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Duration:
              </Typography>
              <Typography variant="body2">{analysisReport.informationExecution.duration}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Routing:
              </Typography>
              <Typography variant="body2">{analysisReport.informationExecution.routing}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Rules (Yara):
              </Typography>
              {analysisReport.informationExecution.yara.map((rule, index) => (
                <Typography key={index} variant="body2">
                  {rule}
                </Typography>
              ))}
            </Box>
          </Box>
        </DashboardCard>
      </Grid>

      <Grid item xs={12} xl={6}>
        <DashboardCard title="Detalles del objetivo" subtitle="Detalles del objetivo analizado">
          <Box display="flex" flexDirection="column" gap={2} mt={1}>

            <Box>
              <Stack
                direction="row"
                spacing={2}
                mb={1}
                justifyContent="space-between"
                alignItems="center"
              >
              </Stack>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                File Name:
              </Typography>
              <Typography variant="body2">{analysisReport.summary.file}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Size:
              </Typography>
              <Typography variant="body2">
                {analysisReport.summary.size}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                Type:
              </Typography>
              <Typography variant="body2">{analysisReport.summary.type}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                MD5:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  wordBreak: "break-all" // Rompe el texto en una nueva línea si es necesario
                }}
              >
                {analysisReport.summary.md5}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                SHA1:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  wordBreak: "break-all" // Rompe el texto en una nueva línea si es necesario
                }}
              >
                {analysisReport.summary.sha1}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                SHA256:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  wordBreak: "break-all" // Rompe el texto en una nueva línea si es necesario
                }}
              >
                {analysisReport.summary.sha256}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                SHA512:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  wordBreak: "break-all" // Rompe el texto en una nueva línea si es necesario
                }}
              >
                {analysisReport.summary.sha512}
              </Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                CRC32:
              </Typography>
              <Typography variant="body2">{analysisReport.summary.crc32}</Typography>
            </Box>

            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                SSDEEP:
              </Typography>
              <Typography variant="body2">
                {analysisReport.summary.ssdeep}
              </Typography>
            </Box>
          </Box>
        </DashboardCard>

      </Grid>

      <Grid item xs={12} xl={12}>
        <DashboardCard title="Results" subtitle="Target malware analysis results">
          {/* <SignaturesTable signatures={signatures} /> */}
          <MalwareAnalysisAccordion signature_data={orderedSignatures} />
        </DashboardCard>
      </Grid>
    </Grid>
  );
};

export default MalwareAnalysisDetail;