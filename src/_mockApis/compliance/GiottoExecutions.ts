// home/Asset.ts

import mock from '../mock'; // Ensure correct path to mock

// Mock data
const executions = [
  {
    "id": 8,
    "creationDate": "2025-01-07T20:01:23.3987624-06:00",
    "executionDate": null,
    "status": "Registered",
    "processToExecute": "Assessment",
    "userRequesting": "admin"
  },
  {
    "id": 7,
    "creationDate": "2025-01-07T20:01:12.3061575-06:00",
    "executionDate": null,
    "status": "Registered",
    "processToExecute": "Assessment",
    "userRequesting": "admin"
  },
  {
    "id": 6,
    "creationDate": "2025-01-07T19:44:06.4518568-06:00",
    "executionDate": "2025-01-07T19:54:31.4929638-06:00",
    "status": "Executed",
    "processToExecute": "Rollback",
    "userRequesting": "admin"
  },
  {
    "id": 5,
    "creationDate": "2025-01-07T19:43:52.437691-06:00",
    "executionDate": "2025-01-07T19:43:52.4376949-06:00",
    "status": "Executed",
    "processToExecute": "Hardening",
    "userRequesting": "admin"
  },
  {
    "id": 4,
    "creationDate": "2024-12-16T15:52:17.2327224-06:00",
    "executionDate": "2024-12-16T15:52:17.2327268-06:00",
    "status": "Executed",
    "processToExecute": "Hardening",
    "userRequesting": "admin"
  },
  {
    "id": 3,
    "creationDate": "2024-12-16T15:51:25.5649915-06:00",
    "executionDate": "2024-12-16T15:51:25.5649951-06:00",
    "status": "Executed",
    "processToExecute": "Hardening",
    "userRequesting": "admin"
  }
];

const executionAssets = [
  {
    "id": 1,
    "name": "giotto-win-srva",
    "description": "Servidor de pruebas para el agente de giotto",
    "networkAddress": "192.168.2.8",
    "companyId": 1,
    "companyName": null,
    "creationDate": "2024-10-15T16:37:23.7885339-06:00",
    "lastKeepAlive": "2025-01-07T20:15:47.1691732-06:00"
  }
];

const executionControlResults = [
  {
    "id": 414,
    "templateExecutionId": 8,
    "controlId": 289,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 821,
        "assetId": 1,
        "controlProcessType": "Policy",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":344,\"ReadOperationType\":2,\"ReadOperation\":\"{ \\\"Path\\\":\\\"System Access\\\", \\\"Name\\\":\\\"MinimumPasswordAge\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":\\\"1\\\", \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\" } }\",\"WriteOperationType\":2,\"WriteOperation\":\"{ \\\"Path\\\":\\\"System Access\\\", \\\"Name\\\":\\\"MinimumPasswordAge\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":\\\"1\\\"} }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":\"1\",\"LogicExpression\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:31.3135226-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 414,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 415,
    "templateExecutionId": 8,
    "controlId": 480,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 853,
        "assetId": 1,
        "controlProcessType": "Policy",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":573,\"ReadOperationType\":2,\"ReadOperation\":\"{ \\\"Path\\\":\\\"System Access\\\", \\\"Name\\\":\\\"LockoutDuration\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":\\\"15\\\", \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\" } }\",\"WriteOperationType\":2,\"WriteOperation\":\"{ \\\"Path\\\":\\\"System Access\\\", \\\"Name\\\":\\\"LockoutDuration\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":\\\"15\\\"} }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":\"30\",\"LogicExpression\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": false,
        "executionDate": "2025-01-07T20:59:34.3045943-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 415,
        "assetId": 1,
        "isExpectedResult": false,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 416,
    "templateExecutionId": 8,
    "controlId": 481,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 854,
        "assetId": 1,
        "controlProcessType": "Policy",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":574,\"ReadOperationType\":2,\"ReadOperation\":\"{ \\\"Path\\\":\\\"System Access\\\", \\\"Name\\\":\\\"LockoutBadCount\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":\\\"10\\\", \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\" } }\",\"WriteOperationType\":2,\"WriteOperation\":\"{ \\\"Path\\\":\\\"System Access\\\", \\\"Name\\\":\\\"LockoutBadCount\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":\\\"10\\\"} }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":\"10\",\"LogicExpression\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:34.5815369-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 416,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 417,
    "templateExecutionId": 8,
    "controlId": 482,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 855,
        "assetId": 1,
        "controlProcessType": "Policy",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":575,\"ReadOperationType\":2,\"ReadOperation\":\"{ \\\"Path\\\":\\\"System Access\\\", \\\"Name\\\":\\\"ClearTextPassword\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":\\\"0\\\", \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\" } }\",\"WriteOperationType\":2,\"WriteOperation\":\"{ \\\"Path\\\":\\\"System Access\\\", \\\"Name\\\":\\\"ClearTextPassword\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":\\\"0\\\"} }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":\"0\",\"LogicExpression\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:34.8525227-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 417,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 418,
    "templateExecutionId": 8,
    "controlId": 483,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 856,
        "assetId": 1,
        "controlProcessType": "Policy",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":576,\"ReadOperationType\":2,\"ReadOperation\":\"{ \\\"Path\\\":\\\"System Access\\\", \\\"Name\\\":\\\"PasswordComplexity\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":\\\"1\\\", \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\" } }\",\"WriteOperationType\":2,\"WriteOperation\":\"{ \\\"Path\\\":\\\"System Access\\\", \\\"Name\\\":\\\"PasswordComplexity\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":\\\"1\\\"} }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":\"1\",\"LogicExpression\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:35.1318501-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 418,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 419,
    "templateExecutionId": 8,
    "controlId": 489,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 857,
        "assetId": 1,
        "controlProcessType": "Policy",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":590,\"ReadOperationType\":2,\"ReadOperation\":\"{ \\\"Path\\\":\\\"Privilege Rights\\\", \\\"Name\\\":\\\"SeLoadDriverPrivilege\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":\\\"*S-1-5-32-544\\\", \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\" } }\",\"WriteOperationType\":2,\"WriteOperation\":\"{ \\\"Path\\\":\\\"Privilege Rights\\\", \\\"Name\\\":\\\"SeLoadDriverPrivilege\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":\\\"*S-1-5-32-544\\\"} }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":\"*S-1-5-32-544\",\"LogicExpression\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:35.4250798-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 419,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 420,
    "templateExecutionId": 8,
    "controlId": 512,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 858,
        "assetId": 1,
        "controlProcessType": "Script",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":629,\"ReadOperationType\":3,\"ReadOperation\":\"{ \\\"ScriptBase64\\\":\\\"cGFyYW0gKAogICAgW3N0cmluZ10kcG9saWN5ID0gInt9IgopCiRPU0xhbmcgPSBHZXQtV21pT2JqZWN0IC1DbGFzcyBXaW4zMl9PcGVyYXRpbmdTeXN0ZW0KJExhbmdQYWNrcyA9ICRPU0xhbmcuTVVJTGFuZ3VhZ2VzCiRkYXRvcyA9IChhdWRpdHBvbCAvZ2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL3IgfCBPdXQtU3RyaW5nKSAKJGFyckRhdG9zID0gJGRhdG9zLlNwbGl0KCcsJykKaWYoJExhbmdQYWNrc1swXS5Db250YWlucygiZXMiKSkKewppZiAoJGFyckRhdG9zWzldLkNvbnRhaW5zKCJTaW4gYXVkaXRvciIpKXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIjAifQplbHNlaWYgKCRhcnJEYXRvc1s5XS5Db250YWlucygiQWNpZXJ0b3MgeSBlcnJvcmVzIikpe1dyaXRlLUhvc3QgLU5vTmV3bGluZSAiMyJ9CmVsc2VpZiAoJGFyckRhdG9zWzldLkNvbnRhaW5zKCJBY2llcnRvcyIpKXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIjEifQplbHNlaWYgKCRhcnJEYXRvc1s5XS5Db250YWlucygiRXJyb3JlcyIpKXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIjIifQplbHNle1dyaXRlLUhvc3QgLU5vTmV3bGluZSAiRXJyb3I6IExhIGNvbmZpZ3VyYWNpw7NuIG5vIGZ1ZSBlbmNvbnRyYWRhIn0KfQplbHNlaWYoJExhbmdQYWNrc1swXS5Db250YWlucygiZW4iKSkKewppZiAoJGFyckRhdG9zWzldLkVxdWFscygiTm8gQXVkaXRpbmciKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIwIn0KZWxzZWlmICgkYXJyRGF0b3NbOV0uQ29udGFpbnMoIlN1Y2Nlc3MgYW5kIEZhaWx1cmUiKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIzIn0KZWxzZWlmICgkYXJyRGF0b3NbOV0uQ29udGFpbnMoIlN1Y2Nlc3MiKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIxIn0KZWxzZWlmICgkYXJyRGF0b3NbOV0uQ29udGFpbnMoIkZhaWx1cmUiKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIyIn0KZWxzZXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIkVycm9yOiBUaGUgY29uZmlndXJhdGlvbiB3YXMgbm90IGZvdW5kIn0KfQplbHNle1dyaXRlLUhvc3QgLU5vTmV3bGluZSAiRXJyb3I6IFRoZSBPcGVyYXRpbmcgU3lzdGVtIGxhbmd1YWdlIGlzIG5vdCBzdXBwb3J0ZWQifQ==\\\", \\\"Parameters\\\":\\\"-policy \\\\\\\"{0CCE9217-69AE-11D9-BED3-505054503030}\\\\\\\"\\\", \\\"Type\\\":0, \\\"ExpectedValue\\\":{ \\\"Value\\\":\\\"1\\\", \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\"} }\",\"WriteOperationType\":3,\"WriteOperation\":\"{ \\\"ScriptBase64\\\":\\\"cGFyYW0gKAogICAgW3N0cmluZ10kcG9saWN5ID0gInt9IiwKICAgIFtzdHJpbmddJHdyaXRldmFsdWUgPSAie0V4cGVjdGVkVmFsdWV9IiwKICAgIFtzdHJpbmddJHJvbGxiYWNrdmFsdWUgPSAie1JvbGxiYWNrVmFsdWV9IgopCmlmICgkd3JpdGV2YWx1ZSAtZXEgIjEiKXsKYXVkaXRwb2wgL3NldCAvc3ViY2F0ZWdvcnk6IiRwb2xpY3kiIC9mYWlsdXJlOmRpc2FibGUgL3N1Y2Nlc3M6ZW5hYmxlCn0KZWxzZWlmICgkd3JpdGV2YWx1ZSAtZXEgIjMiKXsKYXVkaXRwb2wgL3NldCAvc3ViY2F0ZWdvcnk6IiRwb2xpY3kiIC9mYWlsdXJlOmVuYWJsZSAvc3VjY2VzczplbmFibGUKfQplbHNlaWYgKCR3cml0ZXZhbHVlIC1lcSAiMiIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZW5hYmxlIC9zdWNjZXNzOmRpc2FibGUKfQplbHNlaWYgKCR3cml0ZXZhbHVlIC1lcSAiMCIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZGlzYWJsZSAvc3VjY2VzczpkaXNhYmxlCn0KaWYgKCRyb2xsYmFja3ZhbHVlIC1lcSAiMSIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZGlzYWJsZSAvc3VjY2VzczplbmFibGUKfQplbHNlaWYgKCRyb2xsYmFja3ZhbHVlIC1lcSAiMyIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZW5hYmxlIC9zdWNjZXNzOmVuYWJsZQp9CmVsc2VpZiAoJHJvbGxiYWNrdmFsdWUgLWVxICIyIil7CmF1ZGl0cG9sIC9zZXQgL3N1YmNhdGVnb3J5OiIkcG9saWN5IiAvZmFpbHVyZTplbmFibGUgL3N1Y2Nlc3M6ZGlzYWJsZQp9CmVsc2VpZiAoJHJvbGxiYWNrdmFsdWUgLWVxICIwIil7CmF1ZGl0cG9sIC9zZXQgL3N1YmNhdGVnb3J5OiIkcG9saWN5IiAvZmFpbHVyZTpkaXNhYmxlIC9zdWNjZXNzOmRpc2FibGUKfQ==\\\", \\\"Parameters\\\":\\\"-policy \\\\\\\"{0CCE9217-69AE-11D9-BED3-505054503030}\\\\\\\" -WriteValue \\\\\\\"{ValueToWrite}\\\\\\\" -RollbackValue \\\\\\\"{RollbackValue}\\\\\\\"\\\", \\\"Type\\\":0, \\\"ValueToWrite\\\":{ \\\"Value\\\":\\\"1\\\"} }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":\"1\",\"LogicExpression\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:36.1594724-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 420,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 421,
    "templateExecutionId": 8,
    "controlId": 515,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 859,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":639,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\Windows Defender\\\",\\\"Key\\\":\\\"DisableAntiSpyware\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":0, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\Windows Defender\\\", \\\"Key\\\":\\\"DisableAntiSpyware\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":0, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":0,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:36.2098016-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 421,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 422,
    "templateExecutionId": 8,
    "controlId": 516,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 860,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":621,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\DomainProfile\\\",\\\"Key\\\":\\\"DefaultOutboundAction\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":0, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\DomainProfile\\\", \\\"Key\\\":\\\"DefaultOutboundAction\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":0, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":0,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:36.2688205-06:00"
      },
      {
        "id": 861,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 2,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":622,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PrivateProfile\\\",\\\"Key\\\":\\\"DefaultOutboundAction\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":0, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PrivateProfile\\\", \\\"Key\\\":\\\"DefaultOutboundAction\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":0, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":2}",
        "valueResult": "{\"Value\":0,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:36.2688734-06:00"
      },
      {
        "id": 862,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 3,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":623,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PublicProfile\\\",\\\"Key\\\":\\\"DefaultOutboundAction\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":0, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PublicProfile\\\", \\\"Key\\\":\\\"DefaultOutboundAction\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":0, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":3}",
        "valueResult": "{\"Value\":0,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:36.2688991-06:00"
      },
      {
        "id": 863,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 4,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":641,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PrivateProfile\\\",\\\"Key\\\":\\\"DefaultOutboundAction\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":0, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PrivateProfile\\\", \\\"Key\\\":\\\"DefaultOutboundAction\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":0, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":4}",
        "valueResult": "{\"Value\":0,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:36.2689214-06:00"
      },
      {
        "id": 864,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 5,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":640,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PublicProfile\\\",\\\"Key\\\":\\\"DefaultOutboundAction\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":0, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PublicProfile\\\", \\\"Key\\\":\\\"DefaultOutboundAction\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":0, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":5}",
        "valueResult": "{\"Value\":0,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:36.2689429-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 422,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 423,
    "templateExecutionId": 8,
    "controlId": 517,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 865,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":606,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\DomainProfile\\\",\\\"Key\\\":\\\"DefaultInboundAction\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\DomainProfile\\\", \\\"Key\\\":\\\"DefaultInboundAction\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:36.3298342-06:00"
      },
      {
        "id": 866,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 2,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":605,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PrivateProfile\\\",\\\"Key\\\":\\\"DefaultInboundAction\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PrivateProfile\\\", \\\"Key\\\":\\\"DefaultInboundAction\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":2}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:36.3298928-06:00"
      },
      {
        "id": 867,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 3,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":604,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PublicProfile\\\",\\\"Key\\\":\\\"DefaultInboundAction\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PublicProfile\\\", \\\"Key\\\":\\\"DefaultInboundAction\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":3}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:36.3299164-06:00"
      },
      {
        "id": 868,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 4,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":603,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PrivateProfile\\\",\\\"Key\\\":\\\"DefaultInboundAction\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PrivateProfile\\\", \\\"Key\\\":\\\"DefaultInboundAction\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":4}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:36.3299383-06:00"
      },
      {
        "id": 869,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 5,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":620,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PublicProfile\\\",\\\"Key\\\":\\\"DefaultInboundAction\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PublicProfile\\\", \\\"Key\\\":\\\"DefaultInboundAction\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":5}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:36.3299594-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 423,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 424,
    "templateExecutionId": 8,
    "controlId": 518,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 870,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":611,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\DomainProfile\\\",\\\"Key\\\":\\\"EnableFirewall\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\DomainProfile\\\", \\\"Key\\\":\\\"EnableFirewall\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:36.396722-06:00"
      },
      {
        "id": 871,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 2,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":610,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PrivateProfile\\\",\\\"Key\\\":\\\"EnableFirewall\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PrivateProfile\\\", \\\"Key\\\":\\\"EnableFirewall\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":2}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:36.3968499-06:00"
      },
      {
        "id": 872,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 3,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":609,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PublicProfile\\\",\\\"Key\\\":\\\"EnableFirewall\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PublicProfile\\\", \\\"Key\\\":\\\"EnableFirewall\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":3}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:36.396911-06:00"
      },
      {
        "id": 873,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 4,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":608,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PrivateProfile\\\",\\\"Key\\\":\\\"EnableFirewall\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PrivateProfile\\\", \\\"Key\\\":\\\"EnableFirewall\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":4}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:36.3969657-06:00"
      },
      {
        "id": 874,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 5,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":607,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PublicProfile\\\",\\\"Key\\\":\\\"EnableFirewall\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PublicProfile\\\", \\\"Key\\\":\\\"EnableFirewall\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":5}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:36.3970196-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 424,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 425,
    "templateExecutionId": 8,
    "controlId": 519,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 875,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":615,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\DomainProfile\\\\\\\\Logging\\\",\\\"Key\\\":\\\"LogSuccessfulConnections\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\DomainProfile\\\\\\\\Logging\\\", \\\"Key\\\":\\\"LogSuccessfulConnections\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:36.4655139-06:00"
      },
      {
        "id": 876,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 2,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":614,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PrivateProfile\\\\\\\\Logging\\\",\\\"Key\\\":\\\"LogSuccessfulConnections\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PrivateProfile\\\\\\\\Logging\\\", \\\"Key\\\":\\\"LogSuccessfulConnections\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":2}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:36.4655739-06:00"
      },
      {
        "id": 877,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 3,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":613,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PrivateProfile\\\\\\\\Logging\\\",\\\"Key\\\":\\\"LogSuccessfulConnections\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PrivateProfile\\\\\\\\Logging\\\", \\\"Key\\\":\\\"LogSuccessfulConnections\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":3}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:36.4655994-06:00"
      },
      {
        "id": 878,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 4,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":612,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PublicProfile\\\\\\\\Logging\\\",\\\"Key\\\":\\\"LogSuccessfulConnections\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PublicProfile\\\\\\\\Logging\\\", \\\"Key\\\":\\\"LogSuccessfulConnections\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":4}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:36.4656233-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 425,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 426,
    "templateExecutionId": 8,
    "controlId": 522,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 879,
        "assetId": 1,
        "controlProcessType": "Script",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":628,\"ReadOperationType\":3,\"ReadOperation\":\"{ \\\"ScriptBase64\\\":\\\"cGFyYW0gKAogICAgW3N0cmluZ10kcG9saWN5ID0gInt9IgopCiRPU0xhbmcgPSBHZXQtV21pT2JqZWN0IC1DbGFzcyBXaW4zMl9PcGVyYXRpbmdTeXN0ZW0KJExhbmdQYWNrcyA9ICRPU0xhbmcuTVVJTGFuZ3VhZ2VzCiRkYXRvcyA9IChhdWRpdHBvbCAvZ2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL3IgfCBPdXQtU3RyaW5nKSAKJGFyckRhdG9zID0gJGRhdG9zLlNwbGl0KCcsJykKaWYoJExhbmdQYWNrc1swXS5Db250YWlucygiZXMiKSkKewppZiAoJGFyckRhdG9zWzldLkNvbnRhaW5zKCJTaW4gYXVkaXRvciIpKXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIjAifQplbHNlaWYgKCRhcnJEYXRvc1s5XS5Db250YWlucygiQWNpZXJ0b3MgeSBlcnJvcmVzIikpe1dyaXRlLUhvc3QgLU5vTmV3bGluZSAiMyJ9CmVsc2VpZiAoJGFyckRhdG9zWzldLkNvbnRhaW5zKCJBY2llcnRvcyIpKXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIjEifQplbHNlaWYgKCRhcnJEYXRvc1s5XS5Db250YWlucygiRXJyb3JlcyIpKXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIjIifQplbHNle1dyaXRlLUhvc3QgLU5vTmV3bGluZSAiRXJyb3I6IExhIGNvbmZpZ3VyYWNpw7NuIG5vIGZ1ZSBlbmNvbnRyYWRhIn0KfQplbHNlaWYoJExhbmdQYWNrc1swXS5Db250YWlucygiZW4iKSkKewppZiAoJGFyckRhdG9zWzldLkVxdWFscygiTm8gQXVkaXRpbmciKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIwIn0KZWxzZWlmICgkYXJyRGF0b3NbOV0uQ29udGFpbnMoIlN1Y2Nlc3MgYW5kIEZhaWx1cmUiKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIzIn0KZWxzZWlmICgkYXJyRGF0b3NbOV0uQ29udGFpbnMoIlN1Y2Nlc3MiKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIxIn0KZWxzZWlmICgkYXJyRGF0b3NbOV0uQ29udGFpbnMoIkZhaWx1cmUiKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIyIn0KZWxzZXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIkVycm9yOiBUaGUgY29uZmlndXJhdGlvbiB3YXMgbm90IGZvdW5kIn0KfQplbHNle1dyaXRlLUhvc3QgLU5vTmV3bGluZSAiRXJyb3I6IFRoZSBPcGVyYXRpbmcgU3lzdGVtIGxhbmd1YWdlIGlzIG5vdCBzdXBwb3J0ZWQifQ==\\\", \\\"Parameters\\\":\\\"-policy \\\\\\\"{0CCE9216-69AE-11D9-BED3-505054503030}\\\\\\\"\\\", \\\"Type\\\":0, \\\"ExpectedValue\\\":{ \\\"Value\\\":\\\"1\\\", \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\"} }\",\"WriteOperationType\":3,\"WriteOperation\":\"{ \\\"ScriptBase64\\\":\\\"cGFyYW0gKAogICAgW3N0cmluZ10kcG9saWN5ID0gInt9IiwKICAgIFtzdHJpbmddJHdyaXRldmFsdWUgPSAie0V4cGVjdGVkVmFsdWV9IiwKICAgIFtzdHJpbmddJHJvbGxiYWNrdmFsdWUgPSAie1JvbGxiYWNrVmFsdWV9IgopCmlmICgkd3JpdGV2YWx1ZSAtZXEgIjEiKXsKYXVkaXRwb2wgL3NldCAvc3ViY2F0ZWdvcnk6IiRwb2xpY3kiIC9mYWlsdXJlOmRpc2FibGUgL3N1Y2Nlc3M6ZW5hYmxlCn0KZWxzZWlmICgkd3JpdGV2YWx1ZSAtZXEgIjMiKXsKYXVkaXRwb2wgL3NldCAvc3ViY2F0ZWdvcnk6IiRwb2xpY3kiIC9mYWlsdXJlOmVuYWJsZSAvc3VjY2VzczplbmFibGUKfQplbHNlaWYgKCR3cml0ZXZhbHVlIC1lcSAiMiIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZW5hYmxlIC9zdWNjZXNzOmRpc2FibGUKfQplbHNlaWYgKCR3cml0ZXZhbHVlIC1lcSAiMCIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZGlzYWJsZSAvc3VjY2VzczpkaXNhYmxlCn0KaWYgKCRyb2xsYmFja3ZhbHVlIC1lcSAiMSIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZGlzYWJsZSAvc3VjY2VzczplbmFibGUKfQplbHNlaWYgKCRyb2xsYmFja3ZhbHVlIC1lcSAiMyIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZW5hYmxlIC9zdWNjZXNzOmVuYWJsZQp9CmVsc2VpZiAoJHJvbGxiYWNrdmFsdWUgLWVxICIyIil7CmF1ZGl0cG9sIC9zZXQgL3N1YmNhdGVnb3J5OiIkcG9saWN5IiAvZmFpbHVyZTplbmFibGUgL3N1Y2Nlc3M6ZGlzYWJsZQp9CmVsc2VpZiAoJHJvbGxiYWNrdmFsdWUgLWVxICIwIil7CmF1ZGl0cG9sIC9zZXQgL3N1YmNhdGVnb3J5OiIkcG9saWN5IiAvZmFpbHVyZTpkaXNhYmxlIC9zdWNjZXNzOmRpc2FibGUKfQ==\\\", \\\"Parameters\\\":\\\"-policy \\\\\\\"{0CCE9216-69AE-11D9-BED3-505054503030}\\\\\\\" -WriteValue \\\\\\\"{ValueToWrite}\\\\\\\" -RollbackValue \\\\\\\"{RollbackValue}\\\\\\\"\\\", \\\"Type\\\":0, \\\"ValueToWrite\\\":{ \\\"Value\\\":\\\"1\\\"} }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":\"1\",\"LogicExpression\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:37.1040866-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 426,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 427,
    "templateExecutionId": 8,
    "controlId": 471,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 852,
        "assetId": 1,
        "controlProcessType": "Policy",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":564,\"ReadOperationType\":2,\"ReadOperation\":\"{ \\\"Path\\\":\\\"Privilege Rights\\\", \\\"Name\\\":\\\"SeSystemtimePrivilege\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":\\\"*S-1-5-19,*S-1-5-32-544\\\", \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\" } }\",\"WriteOperationType\":2,\"WriteOperation\":\"{ \\\"Path\\\":\\\"Privilege Rights\\\", \\\"Name\\\":\\\"SeSystemtimePrivilege\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":\\\"*S-1-5-19,*S-1-5-32-544\\\"} }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":\"*S-1-5-19,*S-1-5-32-544\",\"LogicExpression\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:34.0586055-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 427,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 428,
    "templateExecutionId": 8,
    "controlId": 523,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 880,
        "assetId": 1,
        "controlProcessType": "Script",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":626,\"ReadOperationType\":3,\"ReadOperation\":\"{ \\\"ScriptBase64\\\":\\\"cGFyYW0gKAogICAgW3N0cmluZ10kcG9saWN5ID0gInt9IgopCiRPU0xhbmcgPSBHZXQtV21pT2JqZWN0IC1DbGFzcyBXaW4zMl9PcGVyYXRpbmdTeXN0ZW0KJExhbmdQYWNrcyA9ICRPU0xhbmcuTVVJTGFuZ3VhZ2VzCiRkYXRvcyA9IChhdWRpdHBvbCAvZ2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL3IgfCBPdXQtU3RyaW5nKSAKJGFyckRhdG9zID0gJGRhdG9zLlNwbGl0KCcsJykKaWYoJExhbmdQYWNrc1swXS5Db250YWlucygiZXMiKSkKewppZiAoJGFyckRhdG9zWzldLkNvbnRhaW5zKCJTaW4gYXVkaXRvciIpKXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIjAifQplbHNlaWYgKCRhcnJEYXRvc1s5XS5Db250YWlucygiQWNpZXJ0b3MgeSBlcnJvcmVzIikpe1dyaXRlLUhvc3QgLU5vTmV3bGluZSAiMyJ9CmVsc2VpZiAoJGFyckRhdG9zWzldLkNvbnRhaW5zKCJBY2llcnRvcyIpKXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIjEifQplbHNlaWYgKCRhcnJEYXRvc1s5XS5Db250YWlucygiRXJyb3JlcyIpKXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIjIifQplbHNle1dyaXRlLUhvc3QgLU5vTmV3bGluZSAiRXJyb3I6IExhIGNvbmZpZ3VyYWNpw7NuIG5vIGZ1ZSBlbmNvbnRyYWRhIn0KfQplbHNlaWYoJExhbmdQYWNrc1swXS5Db250YWlucygiZW4iKSkKewppZiAoJGFyckRhdG9zWzldLkVxdWFscygiTm8gQXVkaXRpbmciKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIwIn0KZWxzZWlmICgkYXJyRGF0b3NbOV0uQ29udGFpbnMoIlN1Y2Nlc3MgYW5kIEZhaWx1cmUiKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIzIn0KZWxzZWlmICgkYXJyRGF0b3NbOV0uQ29udGFpbnMoIlN1Y2Nlc3MiKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIxIn0KZWxzZWlmICgkYXJyRGF0b3NbOV0uQ29udGFpbnMoIkZhaWx1cmUiKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIyIn0KZWxzZXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIkVycm9yOiBUaGUgY29uZmlndXJhdGlvbiB3YXMgbm90IGZvdW5kIn0KfQplbHNle1dyaXRlLUhvc3QgLU5vTmV3bGluZSAiRXJyb3I6IFRoZSBPcGVyYXRpbmcgU3lzdGVtIGxhbmd1YWdlIGlzIG5vdCBzdXBwb3J0ZWQifQ==\\\", \\\"Parameters\\\":\\\"-policy \\\\\\\"{0CCE921C-69AE-11D9-BED3-505054503030}\\\\\\\"\\\", \\\"Type\\\":0, \\\"ExpectedValue\\\":{ \\\"Value\\\":\\\"3\\\", \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\"} }\",\"WriteOperationType\":3,\"WriteOperation\":\"{ \\\"ScriptBase64\\\":\\\"cGFyYW0gKAogICAgW3N0cmluZ10kcG9saWN5ID0gInt9IiwKICAgIFtzdHJpbmddJHdyaXRldmFsdWUgPSAie0V4cGVjdGVkVmFsdWV9IiwKICAgIFtzdHJpbmddJHJvbGxiYWNrdmFsdWUgPSAie1JvbGxiYWNrVmFsdWV9IgopCmlmICgkd3JpdGV2YWx1ZSAtZXEgIjEiKXsKYXVkaXRwb2wgL3NldCAvc3ViY2F0ZWdvcnk6IiRwb2xpY3kiIC9mYWlsdXJlOmRpc2FibGUgL3N1Y2Nlc3M6ZW5hYmxlCn0KZWxzZWlmICgkd3JpdGV2YWx1ZSAtZXEgIjMiKXsKYXVkaXRwb2wgL3NldCAvc3ViY2F0ZWdvcnk6IiRwb2xpY3kiIC9mYWlsdXJlOmVuYWJsZSAvc3VjY2VzczplbmFibGUKfQplbHNlaWYgKCR3cml0ZXZhbHVlIC1lcSAiMiIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZW5hYmxlIC9zdWNjZXNzOmRpc2FibGUKfQplbHNlaWYgKCR3cml0ZXZhbHVlIC1lcSAiMCIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZGlzYWJsZSAvc3VjY2VzczpkaXNhYmxlCn0KaWYgKCRyb2xsYmFja3ZhbHVlIC1lcSAiMSIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZGlzYWJsZSAvc3VjY2VzczplbmFibGUKfQplbHNlaWYgKCRyb2xsYmFja3ZhbHVlIC1lcSAiMyIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZW5hYmxlIC9zdWNjZXNzOmVuYWJsZQp9CmVsc2VpZiAoJHJvbGxiYWNrdmFsdWUgLWVxICIyIil7CmF1ZGl0cG9sIC9zZXQgL3N1YmNhdGVnb3J5OiIkcG9saWN5IiAvZmFpbHVyZTplbmFibGUgL3N1Y2Nlc3M6ZGlzYWJsZQp9CmVsc2VpZiAoJHJvbGxiYWNrdmFsdWUgLWVxICIwIil7CmF1ZGl0cG9sIC9zZXQgL3N1YmNhdGVnb3J5OiIkcG9saWN5IiAvZmFpbHVyZTpkaXNhYmxlIC9zdWNjZXNzOmRpc2FibGUKfQ==\\\", \\\"Parameters\\\":\\\"-policy \\\\\\\"{0CCE921C-69AE-11D9-BED3-505054503030}\\\\\\\" -WriteValue \\\\\\\"{ValueToWrite}\\\\\\\" -RollbackValue \\\\\\\"{RollbackValue}\\\\\\\"\\\", \\\"Type\\\":0, \\\"ValueToWrite\\\":{ \\\"Value\\\":\\\"3\\\"} }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":\"3\",\"LogicExpression\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:37.7019136-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 428,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 429,
    "templateExecutionId": 8,
    "controlId": 533,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 882,
        "assetId": 1,
        "controlProcessType": "Script",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":515,\"ReadOperationType\":3,\"ReadOperation\":\"{ \\\"ScriptBase64\\\":\\\"cGFyYW0gKAogICAgW3N0cmluZ10kcG9saWN5ID0gInt9IgopCiRPU0xhbmcgPSBHZXQtV21pT2JqZWN0IC1DbGFzcyBXaW4zMl9PcGVyYXRpbmdTeXN0ZW0KJExhbmdQYWNrcyA9ICRPU0xhbmcuTVVJTGFuZ3VhZ2VzCiRkYXRvcyA9IChhdWRpdHBvbCAvZ2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL3IgfCBPdXQtU3RyaW5nKSAKJGFyckRhdG9zID0gJGRhdG9zLlNwbGl0KCcsJykKaWYoJExhbmdQYWNrc1swXS5Db250YWlucygiZXMiKSkKewppZiAoJGFyckRhdG9zWzldLkNvbnRhaW5zKCJTaW4gYXVkaXRvciIpKXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIjAifQplbHNlaWYgKCRhcnJEYXRvc1s5XS5Db250YWlucygiQWNpZXJ0b3MgeSBlcnJvcmVzIikpe1dyaXRlLUhvc3QgLU5vTmV3bGluZSAiMyJ9CmVsc2VpZiAoJGFyckRhdG9zWzldLkNvbnRhaW5zKCJBY2llcnRvcyIpKXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIjEifQplbHNlaWYgKCRhcnJEYXRvc1s5XS5Db250YWlucygiRXJyb3JlcyIpKXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIjIifQplbHNle1dyaXRlLUhvc3QgLU5vTmV3bGluZSAiRXJyb3I6IExhIGNvbmZpZ3VyYWNpw7NuIG5vIGZ1ZSBlbmNvbnRyYWRhIn0KfQplbHNlaWYoJExhbmdQYWNrc1swXS5Db250YWlucygiZW4iKSkKewppZiAoJGFyckRhdG9zWzldLkVxdWFscygiTm8gQXVkaXRpbmciKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIwIn0KZWxzZWlmICgkYXJyRGF0b3NbOV0uQ29udGFpbnMoIlN1Y2Nlc3MgYW5kIEZhaWx1cmUiKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIzIn0KZWxzZWlmICgkYXJyRGF0b3NbOV0uQ29udGFpbnMoIlN1Y2Nlc3MiKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIxIn0KZWxzZWlmICgkYXJyRGF0b3NbOV0uQ29udGFpbnMoIkZhaWx1cmUiKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIyIn0KZWxzZXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIkVycm9yOiBUaGUgY29uZmlndXJhdGlvbiB3YXMgbm90IGZvdW5kIn0KfQplbHNle1dyaXRlLUhvc3QgLU5vTmV3bGluZSAiRXJyb3I6IFRoZSBPcGVyYXRpbmcgU3lzdGVtIGxhbmd1YWdlIGlzIG5vdCBzdXBwb3J0ZWQifQ==\\\", \\\"Parameters\\\":\\\"-policy \\\\\\\"{0CCE9231-69AE-11D9-BED3-505054503030}\\\\\\\"\\\", \\\"Type\\\":0, \\\"ExpectedValue\\\":{ \\\"Value\\\":\\\"3\\\", \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\"} }\",\"WriteOperationType\":3,\"WriteOperation\":\"{ \\\"ScriptBase64\\\":\\\"cGFyYW0gKAogICAgW3N0cmluZ10kcG9saWN5ID0gInt9IiwKICAgIFtzdHJpbmddJHdyaXRldmFsdWUgPSAie0V4cGVjdGVkVmFsdWV9IiwKICAgIFtzdHJpbmddJHJvbGxiYWNrdmFsdWUgPSAie1JvbGxiYWNrVmFsdWV9IgopCmlmICgkd3JpdGV2YWx1ZSAtZXEgIjEiKXsKYXVkaXRwb2wgL3NldCAvc3ViY2F0ZWdvcnk6IiRwb2xpY3kiIC9mYWlsdXJlOmRpc2FibGUgL3N1Y2Nlc3M6ZW5hYmxlCn0KZWxzZWlmICgkd3JpdGV2YWx1ZSAtZXEgIjMiKXsKYXVkaXRwb2wgL3NldCAvc3ViY2F0ZWdvcnk6IiRwb2xpY3kiIC9mYWlsdXJlOmVuYWJsZSAvc3VjY2VzczplbmFibGUKfQplbHNlaWYgKCR3cml0ZXZhbHVlIC1lcSAiMiIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZW5hYmxlIC9zdWNjZXNzOmRpc2FibGUKfQplbHNlaWYgKCR3cml0ZXZhbHVlIC1lcSAiMCIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZGlzYWJsZSAvc3VjY2VzczpkaXNhYmxlCn0KaWYgKCRyb2xsYmFja3ZhbHVlIC1lcSAiMSIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZGlzYWJsZSAvc3VjY2VzczplbmFibGUKfQplbHNlaWYgKCRyb2xsYmFja3ZhbHVlIC1lcSAiMyIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZW5hYmxlIC9zdWNjZXNzOmVuYWJsZQp9CmVsc2VpZiAoJHJvbGxiYWNrdmFsdWUgLWVxICIyIil7CmF1ZGl0cG9sIC9zZXQgL3N1YmNhdGVnb3J5OiIkcG9saWN5IiAvZmFpbHVyZTplbmFibGUgL3N1Y2Nlc3M6ZGlzYWJsZQp9CmVsc2VpZiAoJHJvbGxiYWNrdmFsdWUgLWVxICIwIil7CmF1ZGl0cG9sIC9zZXQgL3N1YmNhdGVnb3J5OiIkcG9saWN5IiAvZmFpbHVyZTpkaXNhYmxlIC9zdWNjZXNzOmRpc2FibGUKfQ==\\\", \\\"Parameters\\\":\\\"-policy \\\\\\\"{0CCE9231-69AE-11D9-BED3-505054503030}\\\\\\\" -WriteValue \\\\\\\"{ValueToWrite}\\\\\\\" -RollbackValue \\\\\\\"{RollbackValue}\\\\\\\"\\\", \\\"Type\\\":0, \\\"ValueToWrite\\\":{ \\\"Value\\\":\\\"3\\\"} }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":\"3\",\"LogicExpression\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:38.9668006-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 429,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 430,
    "templateExecutionId": 8,
    "controlId": 534,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 883,
        "assetId": 1,
        "controlProcessType": "Script",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":600,\"ReadOperationType\":3,\"ReadOperation\":\"{ \\\"ScriptBase64\\\":\\\"cGFyYW0gKAogICAgW3N0cmluZ10kcG9saWN5ID0gInt9IgopCiRPU0xhbmcgPSBHZXQtV21pT2JqZWN0IC1DbGFzcyBXaW4zMl9PcGVyYXRpbmdTeXN0ZW0KJExhbmdQYWNrcyA9ICRPU0xhbmcuTVVJTGFuZ3VhZ2VzCiRkYXRvcyA9IChhdWRpdHBvbCAvZ2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL3IgfCBPdXQtU3RyaW5nKSAKJGFyckRhdG9zID0gJGRhdG9zLlNwbGl0KCcsJykKaWYoJExhbmdQYWNrc1swXS5Db250YWlucygiZXMiKSkKewppZiAoJGFyckRhdG9zWzldLkNvbnRhaW5zKCJTaW4gYXVkaXRvciIpKXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIjAifQplbHNlaWYgKCRhcnJEYXRvc1s5XS5Db250YWlucygiQWNpZXJ0b3MgeSBlcnJvcmVzIikpe1dyaXRlLUhvc3QgLU5vTmV3bGluZSAiMyJ9CmVsc2VpZiAoJGFyckRhdG9zWzldLkNvbnRhaW5zKCJBY2llcnRvcyIpKXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIjEifQplbHNlaWYgKCRhcnJEYXRvc1s5XS5Db250YWlucygiRXJyb3JlcyIpKXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIjIifQplbHNle1dyaXRlLUhvc3QgLU5vTmV3bGluZSAiRXJyb3I6IExhIGNvbmZpZ3VyYWNpw7NuIG5vIGZ1ZSBlbmNvbnRyYWRhIn0KfQplbHNlaWYoJExhbmdQYWNrc1swXS5Db250YWlucygiZW4iKSkKewppZiAoJGFyckRhdG9zWzldLkVxdWFscygiTm8gQXVkaXRpbmciKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIwIn0KZWxzZWlmICgkYXJyRGF0b3NbOV0uQ29udGFpbnMoIlN1Y2Nlc3MgYW5kIEZhaWx1cmUiKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIzIn0KZWxzZWlmICgkYXJyRGF0b3NbOV0uQ29udGFpbnMoIlN1Y2Nlc3MiKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIxIn0KZWxzZWlmICgkYXJyRGF0b3NbOV0uQ29udGFpbnMoIkZhaWx1cmUiKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIyIn0KZWxzZXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIkVycm9yOiBUaGUgY29uZmlndXJhdGlvbiB3YXMgbm90IGZvdW5kIn0KfQplbHNle1dyaXRlLUhvc3QgLU5vTmV3bGluZSAiRXJyb3I6IFRoZSBPcGVyYXRpbmcgU3lzdGVtIGxhbmd1YWdlIGlzIG5vdCBzdXBwb3J0ZWQifQ==\\\", \\\"Parameters\\\":\\\"-policy \\\\\\\"{0CCE9230-69AE-11D9-BED3-505054503030}\\\\\\\"\\\", \\\"Type\\\":0, \\\"ExpectedValue\\\":{ \\\"Value\\\":\\\"1\\\", \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\"} }\",\"WriteOperationType\":3,\"WriteOperation\":\"{ \\\"ScriptBase64\\\":\\\"cGFyYW0gKAogICAgW3N0cmluZ10kcG9saWN5ID0gInt9IiwKICAgIFtzdHJpbmddJHdyaXRldmFsdWUgPSAie0V4cGVjdGVkVmFsdWV9IiwKICAgIFtzdHJpbmddJHJvbGxiYWNrdmFsdWUgPSAie1JvbGxiYWNrVmFsdWV9IgopCmlmICgkd3JpdGV2YWx1ZSAtZXEgIjEiKXsKYXVkaXRwb2wgL3NldCAvc3ViY2F0ZWdvcnk6IiRwb2xpY3kiIC9mYWlsdXJlOmRpc2FibGUgL3N1Y2Nlc3M6ZW5hYmxlCn0KZWxzZWlmICgkd3JpdGV2YWx1ZSAtZXEgIjMiKXsKYXVkaXRwb2wgL3NldCAvc3ViY2F0ZWdvcnk6IiRwb2xpY3kiIC9mYWlsdXJlOmVuYWJsZSAvc3VjY2VzczplbmFibGUKfQplbHNlaWYgKCR3cml0ZXZhbHVlIC1lcSAiMiIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZW5hYmxlIC9zdWNjZXNzOmRpc2FibGUKfQplbHNlaWYgKCR3cml0ZXZhbHVlIC1lcSAiMCIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZGlzYWJsZSAvc3VjY2VzczpkaXNhYmxlCn0KaWYgKCRyb2xsYmFja3ZhbHVlIC1lcSAiMSIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZGlzYWJsZSAvc3VjY2VzczplbmFibGUKfQplbHNlaWYgKCRyb2xsYmFja3ZhbHVlIC1lcSAiMyIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZW5hYmxlIC9zdWNjZXNzOmVuYWJsZQp9CmVsc2VpZiAoJHJvbGxiYWNrdmFsdWUgLWVxICIyIil7CmF1ZGl0cG9sIC9zZXQgL3N1YmNhdGVnb3J5OiIkcG9saWN5IiAvZmFpbHVyZTplbmFibGUgL3N1Y2Nlc3M6ZGlzYWJsZQp9CmVsc2VpZiAoJHJvbGxiYWNrdmFsdWUgLWVxICIwIil7CmF1ZGl0cG9sIC9zZXQgL3N1YmNhdGVnb3J5OiIkcG9saWN5IiAvZmFpbHVyZTpkaXNhYmxlIC9zdWNjZXNzOmRpc2FibGUKfQ==\\\", \\\"Parameters\\\":\\\"-policy \\\\\\\"{0CCE9230-69AE-11D9-BED3-505054503030}\\\\\\\" -WriteValue \\\\\\\"{ValueToWrite}\\\\\\\" -RollbackValue \\\\\\\"{RollbackValue}\\\\\\\"\\\", \\\"Type\\\":0, \\\"ValueToWrite\\\":{ \\\"Value\\\":\\\"1\\\"} }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":\"1\",\"LogicExpression\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:39.5771494-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 430,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 431,
    "templateExecutionId": 8,
    "controlId": 535,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 884,
        "assetId": 1,
        "controlProcessType": "Script",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":516,\"ReadOperationType\":3,\"ReadOperation\":\"{ \\\"ScriptBase64\\\":\\\"cGFyYW0gKAogICAgW3N0cmluZ10kcG9saWN5ID0gInt9IgopCiRPU0xhbmcgPSBHZXQtV21pT2JqZWN0IC1DbGFzcyBXaW4zMl9PcGVyYXRpbmdTeXN0ZW0KJExhbmdQYWNrcyA9ICRPU0xhbmcuTVVJTGFuZ3VhZ2VzCiRkYXRvcyA9IChhdWRpdHBvbCAvZ2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL3IgfCBPdXQtU3RyaW5nKSAKJGFyckRhdG9zID0gJGRhdG9zLlNwbGl0KCcsJykKaWYoJExhbmdQYWNrc1swXS5Db250YWlucygiZXMiKSkKewppZiAoJGFyckRhdG9zWzldLkNvbnRhaW5zKCJTaW4gYXVkaXRvciIpKXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIjAifQplbHNlaWYgKCRhcnJEYXRvc1s5XS5Db250YWlucygiQWNpZXJ0b3MgeSBlcnJvcmVzIikpe1dyaXRlLUhvc3QgLU5vTmV3bGluZSAiMyJ9CmVsc2VpZiAoJGFyckRhdG9zWzldLkNvbnRhaW5zKCJBY2llcnRvcyIpKXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIjEifQplbHNlaWYgKCRhcnJEYXRvc1s5XS5Db250YWlucygiRXJyb3JlcyIpKXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIjIifQplbHNle1dyaXRlLUhvc3QgLU5vTmV3bGluZSAiRXJyb3I6IExhIGNvbmZpZ3VyYWNpw7NuIG5vIGZ1ZSBlbmNvbnRyYWRhIn0KfQplbHNlaWYoJExhbmdQYWNrc1swXS5Db250YWlucygiZW4iKSkKewppZiAoJGFyckRhdG9zWzldLkVxdWFscygiTm8gQXVkaXRpbmciKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIwIn0KZWxzZWlmICgkYXJyRGF0b3NbOV0uQ29udGFpbnMoIlN1Y2Nlc3MgYW5kIEZhaWx1cmUiKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIzIn0KZWxzZWlmICgkYXJyRGF0b3NbOV0uQ29udGFpbnMoIlN1Y2Nlc3MiKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIxIn0KZWxzZWlmICgkYXJyRGF0b3NbOV0uQ29udGFpbnMoIkZhaWx1cmUiKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIyIn0KZWxzZXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIkVycm9yOiBUaGUgY29uZmlndXJhdGlvbiB3YXMgbm90IGZvdW5kIn0KfQplbHNle1dyaXRlLUhvc3QgLU5vTmV3bGluZSAiRXJyb3I6IFRoZSBPcGVyYXRpbmcgU3lzdGVtIGxhbmd1YWdlIGlzIG5vdCBzdXBwb3J0ZWQifQ==\\\", \\\"Parameters\\\":\\\"-policy \\\\\\\"{0CCE922F-69AE-11D9-BED3-505054503030}\\\\\\\"\\\", \\\"Type\\\":0, \\\"ExpectedValue\\\":{ \\\"Value\\\":\\\"3\\\", \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\"} }\",\"WriteOperationType\":3,\"WriteOperation\":\"{ \\\"ScriptBase64\\\":\\\"cGFyYW0gKAogICAgW3N0cmluZ10kcG9saWN5ID0gInt9IiwKICAgIFtzdHJpbmddJHdyaXRldmFsdWUgPSAie0V4cGVjdGVkVmFsdWV9IiwKICAgIFtzdHJpbmddJHJvbGxiYWNrdmFsdWUgPSAie1JvbGxiYWNrVmFsdWV9IgopCmlmICgkd3JpdGV2YWx1ZSAtZXEgIjEiKXsKYXVkaXRwb2wgL3NldCAvc3ViY2F0ZWdvcnk6IiRwb2xpY3kiIC9mYWlsdXJlOmRpc2FibGUgL3N1Y2Nlc3M6ZW5hYmxlCn0KZWxzZWlmICgkd3JpdGV2YWx1ZSAtZXEgIjMiKXsKYXVkaXRwb2wgL3NldCAvc3ViY2F0ZWdvcnk6IiRwb2xpY3kiIC9mYWlsdXJlOmVuYWJsZSAvc3VjY2VzczplbmFibGUKfQplbHNlaWYgKCR3cml0ZXZhbHVlIC1lcSAiMiIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZW5hYmxlIC9zdWNjZXNzOmRpc2FibGUKfQplbHNlaWYgKCR3cml0ZXZhbHVlIC1lcSAiMCIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZGlzYWJsZSAvc3VjY2VzczpkaXNhYmxlCn0KaWYgKCRyb2xsYmFja3ZhbHVlIC1lcSAiMSIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZGlzYWJsZSAvc3VjY2VzczplbmFibGUKfQplbHNlaWYgKCRyb2xsYmFja3ZhbHVlIC1lcSAiMyIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZW5hYmxlIC9zdWNjZXNzOmVuYWJsZQp9CmVsc2VpZiAoJHJvbGxiYWNrdmFsdWUgLWVxICIyIil7CmF1ZGl0cG9sIC9zZXQgL3N1YmNhdGVnb3J5OiIkcG9saWN5IiAvZmFpbHVyZTplbmFibGUgL3N1Y2Nlc3M6ZGlzYWJsZQp9CmVsc2VpZiAoJHJvbGxiYWNrdmFsdWUgLWVxICIwIil7CmF1ZGl0cG9sIC9zZXQgL3N1YmNhdGVnb3J5OiIkcG9saWN5IiAvZmFpbHVyZTpkaXNhYmxlIC9zdWNjZXNzOmRpc2FibGUKfQ==\\\", \\\"Parameters\\\":\\\"-policy \\\\\\\"{0CCE922F-69AE-11D9-BED3-505054503030}\\\\\\\" -WriteValue \\\\\\\"{ValueToWrite}\\\\\\\" -RollbackValue \\\\\\\"{RollbackValue}\\\\\\\"\\\", \\\"Type\\\":0, \\\"ValueToWrite\\\":{ \\\"Value\\\":\\\"3\\\"} }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":\"3\",\"LogicExpression\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:40.1776061-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 431,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 432,
    "templateExecutionId": 8,
    "controlId": 537,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 885,
        "assetId": 1,
        "controlProcessType": "Script",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":625,\"ReadOperationType\":3,\"ReadOperation\":\"{ \\\"ScriptBase64\\\":\\\"cGFyYW0gKAogICAgW3N0cmluZ10kcG9saWN5ID0gInt9IgopCiRPU0xhbmcgPSBHZXQtV21pT2JqZWN0IC1DbGFzcyBXaW4zMl9PcGVyYXRpbmdTeXN0ZW0KJExhbmdQYWNrcyA9ICRPU0xhbmcuTVVJTGFuZ3VhZ2VzCiRkYXRvcyA9IChhdWRpdHBvbCAvZ2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL3IgfCBPdXQtU3RyaW5nKSAKJGFyckRhdG9zID0gJGRhdG9zLlNwbGl0KCcsJykKaWYoJExhbmdQYWNrc1swXS5Db250YWlucygiZXMiKSkKewppZiAoJGFyckRhdG9zWzldLkNvbnRhaW5zKCJTaW4gYXVkaXRvciIpKXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIjAifQplbHNlaWYgKCRhcnJEYXRvc1s5XS5Db250YWlucygiQWNpZXJ0b3MgeSBlcnJvcmVzIikpe1dyaXRlLUhvc3QgLU5vTmV3bGluZSAiMyJ9CmVsc2VpZiAoJGFyckRhdG9zWzldLkNvbnRhaW5zKCJBY2llcnRvcyIpKXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIjEifQplbHNlaWYgKCRhcnJEYXRvc1s5XS5Db250YWlucygiRXJyb3JlcyIpKXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIjIifQplbHNle1dyaXRlLUhvc3QgLU5vTmV3bGluZSAiRXJyb3I6IExhIGNvbmZpZ3VyYWNpw7NuIG5vIGZ1ZSBlbmNvbnRyYWRhIn0KfQplbHNlaWYoJExhbmdQYWNrc1swXS5Db250YWlucygiZW4iKSkKewppZiAoJGFyckRhdG9zWzldLkVxdWFscygiTm8gQXVkaXRpbmciKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIwIn0KZWxzZWlmICgkYXJyRGF0b3NbOV0uQ29udGFpbnMoIlN1Y2Nlc3MgYW5kIEZhaWx1cmUiKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIzIn0KZWxzZWlmICgkYXJyRGF0b3NbOV0uQ29udGFpbnMoIlN1Y2Nlc3MiKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIxIn0KZWxzZWlmICgkYXJyRGF0b3NbOV0uQ29udGFpbnMoIkZhaWx1cmUiKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIyIn0KZWxzZXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIkVycm9yOiBUaGUgY29uZmlndXJhdGlvbiB3YXMgbm90IGZvdW5kIn0KfQplbHNle1dyaXRlLUhvc3QgLU5vTmV3bGluZSAiRXJyb3I6IFRoZSBPcGVyYXRpbmcgU3lzdGVtIGxhbmd1YWdlIGlzIG5vdCBzdXBwb3J0ZWQifQ==\\\", \\\"Parameters\\\":\\\"-policy \\\\\\\"{0CCE921B-69AE-11D9-BED3-505054503030}\\\\\\\"\\\", \\\"Type\\\":0, \\\"ExpectedValue\\\":{ \\\"Value\\\":\\\"1\\\", \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\"} }\",\"WriteOperationType\":3,\"WriteOperation\":\"{ \\\"ScriptBase64\\\":\\\"cGFyYW0gKAogICAgW3N0cmluZ10kcG9saWN5ID0gInt9IiwKICAgIFtzdHJpbmddJHdyaXRldmFsdWUgPSAie0V4cGVjdGVkVmFsdWV9IiwKICAgIFtzdHJpbmddJHJvbGxiYWNrdmFsdWUgPSAie1JvbGxiYWNrVmFsdWV9IgopCmlmICgkd3JpdGV2YWx1ZSAtZXEgIjEiKXsKYXVkaXRwb2wgL3NldCAvc3ViY2F0ZWdvcnk6IiRwb2xpY3kiIC9mYWlsdXJlOmRpc2FibGUgL3N1Y2Nlc3M6ZW5hYmxlCn0KZWxzZWlmICgkd3JpdGV2YWx1ZSAtZXEgIjMiKXsKYXVkaXRwb2wgL3NldCAvc3ViY2F0ZWdvcnk6IiRwb2xpY3kiIC9mYWlsdXJlOmVuYWJsZSAvc3VjY2VzczplbmFibGUKfQplbHNlaWYgKCR3cml0ZXZhbHVlIC1lcSAiMiIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZW5hYmxlIC9zdWNjZXNzOmRpc2FibGUKfQplbHNlaWYgKCR3cml0ZXZhbHVlIC1lcSAiMCIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZGlzYWJsZSAvc3VjY2VzczpkaXNhYmxlCn0KaWYgKCRyb2xsYmFja3ZhbHVlIC1lcSAiMSIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZGlzYWJsZSAvc3VjY2VzczplbmFibGUKfQplbHNlaWYgKCRyb2xsYmFja3ZhbHVlIC1lcSAiMyIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZW5hYmxlIC9zdWNjZXNzOmVuYWJsZQp9CmVsc2VpZiAoJHJvbGxiYWNrdmFsdWUgLWVxICIyIil7CmF1ZGl0cG9sIC9zZXQgL3N1YmNhdGVnb3J5OiIkcG9saWN5IiAvZmFpbHVyZTplbmFibGUgL3N1Y2Nlc3M6ZGlzYWJsZQp9CmVsc2VpZiAoJHJvbGxiYWNrdmFsdWUgLWVxICIwIil7CmF1ZGl0cG9sIC9zZXQgL3N1YmNhdGVnb3J5OiIkcG9saWN5IiAvZmFpbHVyZTpkaXNhYmxlIC9zdWNjZXNzOmRpc2FibGUKfQ==\\\", \\\"Parameters\\\":\\\"-policy \\\\\\\"{0CCE921B-69AE-11D9-BED3-505054503030}\\\\\\\" -WriteValue \\\\\\\"{ValueToWrite}\\\\\\\" -RollbackValue \\\\\\\"{RollbackValue}\\\\\\\"\\\", \\\"Type\\\":0, \\\"ValueToWrite\\\":{ \\\"Value\\\":\\\"1\\\"} }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":\"1\",\"LogicExpression\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:40.7924331-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 432,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 433,
    "templateExecutionId": 8,
    "controlId": 540,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 886,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":669,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\DomainProfile\\\\\\\\Logging\\\",\\\"Key\\\":\\\"LogFilePath\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":\\\"%SYSTEMROOT%\\\\\\\\System32\\\\\\\\logfiles\\\\\\\\firewall\\\\\\\\domainfw.log\\\", \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"2\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\DomainProfile\\\\\\\\Logging\\\", \\\"Key\\\":\\\"LogFilePath\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":\\\"%SYSTEMROOT%\\\\\\\\System32\\\\\\\\logfiles\\\\\\\\firewall\\\\\\\\domainfw.log\\\", \\\"ValueType\\\":\\\"2\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":\"%SYSTEMROOT%\\\\System32\\\\logfiles\\\\firewall\\\\domainfw.log\",\"ValueType\":2,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:40.8513737-06:00"
      },
      {
        "id": 887,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 2,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":668,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PrivateProfile\\\\\\\\Logging\\\",\\\"Key\\\":\\\"LogFilePath\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":\\\"%SYSTEMROOT%\\\\\\\\System32\\\\\\\\logfiles\\\\\\\\firewall\\\\\\\\privatefw.log\\\", \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"2\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PrivateProfile\\\\\\\\Logging\\\", \\\"Key\\\":\\\"LogFilePath\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":\\\"%SYSTEMROOT%\\\\\\\\System32\\\\\\\\logfiles\\\\\\\\firewall\\\\\\\\privatefw.log\\\", \\\"ValueType\\\":\\\"2\\\" } }\",\"LastAssessmentValue\":null,\"Order\":2}",
        "valueResult": "{\"Value\":\"%SYSTEMROOT%\\\\System32\\\\logfiles\\\\firewall\\\\privatefw.log\",\"ValueType\":2,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:40.8514487-06:00"
      },
      {
        "id": 888,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 3,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":667,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PrivateProfile\\\\\\\\Logging\\\",\\\"Key\\\":\\\"LogFilePath\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":\\\"%SYSTEMROOT%\\\\\\\\System32\\\\\\\\logfiles\\\\\\\\firewall\\\\\\\\privatefw.log\\\", \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"2\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PrivateProfile\\\\\\\\Logging\\\", \\\"Key\\\":\\\"LogFilePath\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":\\\"%SYSTEMROOT%\\\\\\\\System32\\\\\\\\logfiles\\\\\\\\firewall\\\\\\\\privatefw.log\\\", \\\"ValueType\\\":\\\"2\\\" } }\",\"LastAssessmentValue\":null,\"Order\":3}",
        "valueResult": "{\"Value\":\"%SYSTEMROOT%\\\\System32\\\\logfiles\\\\firewall\\\\privatefw.log\",\"ValueType\":2,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:40.8514841-06:00"
      },
      {
        "id": 889,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 4,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":645,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PublicProfile\\\\\\\\Logging\\\",\\\"Key\\\":\\\"LogFilePath\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":\\\"%SYSTEMROOT%\\\\\\\\System32\\\\\\\\logfiles\\\\\\\\firewall\\\\\\\\privatefw.log\\\", \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"2\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PublicProfile\\\\\\\\Logging\\\", \\\"Key\\\":\\\"LogFilePath\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":\\\"%SYSTEMROOT%\\\\\\\\System32\\\\\\\\logfiles\\\\\\\\firewall\\\\\\\\privatefw.log\\\", \\\"ValueType\\\":\\\"2\\\" } }\",\"LastAssessmentValue\":null,\"Order\":4}",
        "valueResult": "{\"Value\":\"%SYSTEMROOT%\\\\System32\\\\logfiles\\\\firewall\\\\privatefw.log\",\"ValueType\":2,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:40.8515134-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 433,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 434,
    "templateExecutionId": 8,
    "controlId": 549,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 890,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":539,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SYSTEM\\\\\\\\CurrentControlSet\\\\\\\\Control\\\\\\\\Lsa\\\",\\\"Key\\\":\\\"ForceGuest\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":0, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SYSTEM\\\\\\\\CurrentControlSet\\\\\\\\Control\\\\\\\\Lsa\\\", \\\"Key\\\":\\\"ForceGuest\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":0, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":0,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:40.9073383-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 434,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 435,
    "templateExecutionId": 8,
    "controlId": 550,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 891,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":541,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SYSTEM\\\\\\\\CurrentControlSet\\\\\\\\Services\\\\\\\\LanManServer\\\\\\\\Parameters\\\",\\\"Key\\\":\\\"RestrictNullSessAccess\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SYSTEM\\\\\\\\CurrentControlSet\\\\\\\\Services\\\\\\\\LanManServer\\\\\\\\Parameters\\\", \\\"Key\\\":\\\"RestrictNullSessAccess\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:40.9584188-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 435,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 436,
    "templateExecutionId": 8,
    "controlId": 551,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 892,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":542,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SYSTEM\\\\\\\\CurrentControlSet\\\\\\\\Control\\\\\\\\Lsa\\\",\\\"Key\\\":\\\"EveryoneIncludesAnonymous\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":0, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SYSTEM\\\\\\\\CurrentControlSet\\\\\\\\Control\\\\\\\\Lsa\\\", \\\"Key\\\":\\\"EveryoneIncludesAnonymous\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":0, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":0,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:41.0125508-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 436,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 437,
    "templateExecutionId": 8,
    "controlId": 552,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 893,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":543,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SYSTEM\\\\\\\\CurrentControlSet\\\\\\\\Control\\\\\\\\Lsa\\\",\\\"Key\\\":\\\"DisableDomainCreds\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SYSTEM\\\\\\\\CurrentControlSet\\\\\\\\Control\\\\\\\\Lsa\\\", \\\"Key\\\":\\\"DisableDomainCreds\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:41.06722-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 437,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 438,
    "templateExecutionId": 8,
    "controlId": 555,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 894,
        "assetId": 1,
        "controlProcessType": "Policy",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":547,\"ReadOperationType\":2,\"ReadOperation\":\"{ \\\"Path\\\":\\\"System Access\\\", \\\"Name\\\":\\\"LSAAnonymousNameLookup\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":\\\"0\\\", \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\" } }\",\"WriteOperationType\":2,\"WriteOperation\":\"{ \\\"Path\\\":\\\"System Access\\\", \\\"Name\\\":\\\"LSAAnonymousNameLookup\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":\\\"0\\\"} }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":\"0\",\"LogicExpression\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:41.3481309-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 438,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 439,
    "templateExecutionId": 8,
    "controlId": 556,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 895,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":540,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SYSTEM\\\\\\\\CurrentControlSet\\\\\\\\Services\\\\\\\\LanManServer\\\\\\\\Parameters\\\",\\\"Key\\\":\\\"NullSessionShares\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":null, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SYSTEM\\\\\\\\CurrentControlSet\\\\\\\\Services\\\\\\\\LanManServer\\\\\\\\Parameters\\\", \\\"Key\\\":\\\"NullSessionShares\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":null, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":null,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:41.4025013-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 439,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 440,
    "templateExecutionId": 8,
    "controlId": 557,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 896,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":660,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SYSTEM\\\\\\\\CurrentControlSet\\\\\\\\Services\\\\\\\\LDAP\\\",\\\"Key\\\":\\\"LDAPClientIntegrity\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SYSTEM\\\\\\\\CurrentControlSet\\\\\\\\Services\\\\\\\\LDAP\\\", \\\"Key\\\":\\\"LDAPClientIntegrity\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:41.4551546-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 440,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 441,
    "templateExecutionId": 8,
    "controlId": 530,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 881,
        "assetId": 1,
        "controlProcessType": "Script",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":627,\"ReadOperationType\":3,\"ReadOperation\":\"{ \\\"ScriptBase64\\\":\\\"cGFyYW0gKAogICAgW3N0cmluZ10kcG9saWN5ID0gInt9IgopCiRPU0xhbmcgPSBHZXQtV21pT2JqZWN0IC1DbGFzcyBXaW4zMl9PcGVyYXRpbmdTeXN0ZW0KJExhbmdQYWNrcyA9ICRPU0xhbmcuTVVJTGFuZ3VhZ2VzCiRkYXRvcyA9IChhdWRpdHBvbCAvZ2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL3IgfCBPdXQtU3RyaW5nKSAKJGFyckRhdG9zID0gJGRhdG9zLlNwbGl0KCcsJykKaWYoJExhbmdQYWNrc1swXS5Db250YWlucygiZXMiKSkKewppZiAoJGFyckRhdG9zWzldLkNvbnRhaW5zKCJTaW4gYXVkaXRvciIpKXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIjAifQplbHNlaWYgKCRhcnJEYXRvc1s5XS5Db250YWlucygiQWNpZXJ0b3MgeSBlcnJvcmVzIikpe1dyaXRlLUhvc3QgLU5vTmV3bGluZSAiMyJ9CmVsc2VpZiAoJGFyckRhdG9zWzldLkNvbnRhaW5zKCJBY2llcnRvcyIpKXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIjEifQplbHNlaWYgKCRhcnJEYXRvc1s5XS5Db250YWlucygiRXJyb3JlcyIpKXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIjIifQplbHNle1dyaXRlLUhvc3QgLU5vTmV3bGluZSAiRXJyb3I6IExhIGNvbmZpZ3VyYWNpw7NuIG5vIGZ1ZSBlbmNvbnRyYWRhIn0KfQplbHNlaWYoJExhbmdQYWNrc1swXS5Db250YWlucygiZW4iKSkKewppZiAoJGFyckRhdG9zWzldLkVxdWFscygiTm8gQXVkaXRpbmciKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIwIn0KZWxzZWlmICgkYXJyRGF0b3NbOV0uQ29udGFpbnMoIlN1Y2Nlc3MgYW5kIEZhaWx1cmUiKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIzIn0KZWxzZWlmICgkYXJyRGF0b3NbOV0uQ29udGFpbnMoIlN1Y2Nlc3MiKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIxIn0KZWxzZWlmICgkYXJyRGF0b3NbOV0uQ29udGFpbnMoIkZhaWx1cmUiKSl7V3JpdGUtSG9zdCAtTm9OZXdsaW5lICIyIn0KZWxzZXtXcml0ZS1Ib3N0IC1Ob05ld2xpbmUgIkVycm9yOiBUaGUgY29uZmlndXJhdGlvbiB3YXMgbm90IGZvdW5kIn0KfQplbHNle1dyaXRlLUhvc3QgLU5vTmV3bGluZSAiRXJyb3I6IFRoZSBPcGVyYXRpbmcgU3lzdGVtIGxhbmd1YWdlIGlzIG5vdCBzdXBwb3J0ZWQifQ==\\\", \\\"Parameters\\\":\\\"-policy \\\\\\\"{0CCE9215-69AE-11D9-BED3-505054503030}\\\\\\\"\\\", \\\"Type\\\":0, \\\"ExpectedValue\\\":{ \\\"Value\\\":\\\"3\\\", \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\"} }\",\"WriteOperationType\":3,\"WriteOperation\":\"{ \\\"ScriptBase64\\\":\\\"cGFyYW0gKAogICAgW3N0cmluZ10kcG9saWN5ID0gInt9IiwKICAgIFtzdHJpbmddJHdyaXRldmFsdWUgPSAie0V4cGVjdGVkVmFsdWV9IiwKICAgIFtzdHJpbmddJHJvbGxiYWNrdmFsdWUgPSAie1JvbGxiYWNrVmFsdWV9IgopCmlmICgkd3JpdGV2YWx1ZSAtZXEgIjEiKXsKYXVkaXRwb2wgL3NldCAvc3ViY2F0ZWdvcnk6IiRwb2xpY3kiIC9mYWlsdXJlOmRpc2FibGUgL3N1Y2Nlc3M6ZW5hYmxlCn0KZWxzZWlmICgkd3JpdGV2YWx1ZSAtZXEgIjMiKXsKYXVkaXRwb2wgL3NldCAvc3ViY2F0ZWdvcnk6IiRwb2xpY3kiIC9mYWlsdXJlOmVuYWJsZSAvc3VjY2VzczplbmFibGUKfQplbHNlaWYgKCR3cml0ZXZhbHVlIC1lcSAiMiIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZW5hYmxlIC9zdWNjZXNzOmRpc2FibGUKfQplbHNlaWYgKCR3cml0ZXZhbHVlIC1lcSAiMCIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZGlzYWJsZSAvc3VjY2VzczpkaXNhYmxlCn0KaWYgKCRyb2xsYmFja3ZhbHVlIC1lcSAiMSIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZGlzYWJsZSAvc3VjY2VzczplbmFibGUKfQplbHNlaWYgKCRyb2xsYmFja3ZhbHVlIC1lcSAiMyIpewphdWRpdHBvbCAvc2V0IC9zdWJjYXRlZ29yeToiJHBvbGljeSIgL2ZhaWx1cmU6ZW5hYmxlIC9zdWNjZXNzOmVuYWJsZQp9CmVsc2VpZiAoJHJvbGxiYWNrdmFsdWUgLWVxICIyIil7CmF1ZGl0cG9sIC9zZXQgL3N1YmNhdGVnb3J5OiIkcG9saWN5IiAvZmFpbHVyZTplbmFibGUgL3N1Y2Nlc3M6ZGlzYWJsZQp9CmVsc2VpZiAoJHJvbGxiYWNrdmFsdWUgLWVxICIwIil7CmF1ZGl0cG9sIC9zZXQgL3N1YmNhdGVnb3J5OiIkcG9saWN5IiAvZmFpbHVyZTpkaXNhYmxlIC9zdWNjZXNzOmRpc2FibGUKfQ==\\\", \\\"Parameters\\\":\\\"-policy \\\\\\\"{0CCE9215-69AE-11D9-BED3-505054503030}\\\\\\\" -WriteValue \\\\\\\"{ValueToWrite}\\\\\\\" -RollbackValue \\\\\\\"{RollbackValue}\\\\\\\"\\\", \\\"Type\\\":0, \\\"ValueToWrite\\\":{ \\\"Value\\\":\\\"3\\\"} }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":\"3\",\"LogicExpression\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:38.3358026-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 441,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 442,
    "templateExecutionId": 8,
    "controlId": 560,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 897,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":678,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\DomainProfile\\\",\\\"Key\\\":\\\"EnableFirewall\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\DomainProfile\\\", \\\"Key\\\":\\\"EnableFirewall\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:41.5140101-06:00"
      },
      {
        "id": 898,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 2,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":677,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PrivateProfile\\\",\\\"Key\\\":\\\"EnableFirewall\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PrivateProfile\\\", \\\"Key\\\":\\\"EnableFirewall\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":2}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:41.5140786-06:00"
      },
      {
        "id": 899,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 3,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":685,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PublicProfile\\\",\\\"Key\\\":\\\"EnableFirewall\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PublicProfile\\\", \\\"Key\\\":\\\"EnableFirewall\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":3}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:41.5141121-06:00"
      },
      {
        "id": 900,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 4,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":676,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PrivateProfile\\\",\\\"Key\\\":\\\"EnableFirewall\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PrivateProfile\\\", \\\"Key\\\":\\\"EnableFirewall\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":4}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:41.5141449-06:00"
      },
      {
        "id": 901,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 5,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":674,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PublicProfile\\\",\\\"Key\\\":\\\"EnableFirewall\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\WindowsFirewall\\\\\\\\PublicProfile\\\", \\\"Key\\\":\\\"EnableFirewall\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":5}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:41.5141966-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 442,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 443,
    "templateExecutionId": 8,
    "controlId": 470,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 851,
        "assetId": 1,
        "controlProcessType": "Policy",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":563,\"ReadOperationType\":2,\"ReadOperation\":\"{ \\\"Path\\\":\\\"Privilege Rights\\\", \\\"Name\\\":\\\"SeTimeZonePrivilege\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":\\\"*S-1-5-19,*S-1-5-32-544\\\", \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\" } }\",\"WriteOperationType\":2,\"WriteOperation\":\"{ \\\"Path\\\":\\\"Privilege Rights\\\", \\\"Name\\\":\\\"SeTimeZonePrivilege\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":\\\"*S-1-5-19,*S-1-5-32-544\\\"} }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":\"*S-1-5-19,*S-1-5-32-544\",\"LogicExpression\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:33.7794245-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 443,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 444,
    "templateExecutionId": 8,
    "controlId": 464,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 849,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":521,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SYSTEM\\\\\\\\CurrentControlSet\\\\\\\\Services\\\\\\\\Netlogon\\\\\\\\Parameters\\\",\\\"Key\\\":\\\"DisablePasswordChange\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":0, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SYSTEM\\\\\\\\CurrentControlSet\\\\\\\\Services\\\\\\\\Netlogon\\\\\\\\Parameters\\\", \\\"Key\\\":\\\"DisablePasswordChange\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":0, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":0,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:33.4628543-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 444,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 445,
    "templateExecutionId": 8,
    "controlId": 290,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 822,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":384,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Policies\\\\\\\\Windows\\\\\\\\Sidebar\\\",\\\"Key\\\":\\\"TurnOffSidebar\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\": 1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Policies\\\\\\\\Windows\\\\\\\\Sidebar\\\", \\\"Key\\\":\\\"TurnOffSidebar\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\": 1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:31.354503-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 445,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 446,
    "templateExecutionId": 8,
    "controlId": 296,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 823,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":375,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Policies\\\\\\\\Windows\\\\\\\\Sidebar\\\",\\\"Key\\\":\\\"TurnOffUserInstalledGadgets\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\": 1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Policies\\\\\\\\Windows\\\\\\\\Sidebar\\\", \\\"Key\\\":\\\"TurnOffUserInstalledGadgets\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\": 1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:31.3988819-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 446,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 447,
    "templateExecutionId": 8,
    "controlId": 298,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 824,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":383,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\Windows NT\\\\\\\\Rpc\\\",\\\"Key\\\":\\\"RestrictRemoteClients\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\Windows NT\\\\\\\\Rpc\\\", \\\"Key\\\":\\\"RestrictRemoteClients\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:31.443069-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 447,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 448,
    "templateExecutionId": 8,
    "controlId": 302,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 825,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":362,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\Power\\\\\\\\PowerSettings\\\\\\\\0e796bdb-100d-47d6-a2d5-f7d2daa51f51\\\",\\\"Key\\\":\\\"ACSettingIndex\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\Power\\\\\\\\PowerSettings\\\\\\\\0e796bdb-100d-47d6-a2d5-f7d2daa51f51\\\", \\\"Key\\\":\\\"ACSettingIndex\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:31.4878113-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 448,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 449,
    "templateExecutionId": 8,
    "controlId": 303,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 826,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":345,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\Power\\\\\\\\PowerSettings\\\\\\\\0e796bdb-100d-47d6-a2d5-f7d2daa51f51\\\",\\\"Key\\\":\\\"DCSettingIndex\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\Power\\\\\\\\PowerSettings\\\\\\\\0e796bdb-100d-47d6-a2d5-f7d2daa51f51\\\", \\\"Key\\\":\\\"DCSettingIndex\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:31.5278826-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 449,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 450,
    "templateExecutionId": 8,
    "controlId": 305,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 827,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":346,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Policies\\\\\\\\System\\\",\\\"Key\\\":\\\"LogonType\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\": 0, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Policies\\\\\\\\System\\\", \\\"Key\\\":\\\"LogonType\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\": 0, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":0,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:31.5724401-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 450,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 451,
    "templateExecutionId": 8,
    "controlId": 307,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 828,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":371,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\EventLog\\\\\\\\Security\\\",\\\"Key\\\":\\\"Retention\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":\\\"0\\\", \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"2\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\EventLog\\\\\\\\Security\\\",\\\"Key\\\":\\\"Retention\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":\\\"0\\\", \\\"ValueType\\\":\\\"2\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":\"0\",\"ValueType\":2,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:31.6175628-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 451,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 452,
    "templateExecutionId": 8,
    "controlId": 321,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 829,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":370,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\EventLog\\\\\\\\Security\\\",\\\"Key\\\":\\\"MaxSize\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\": 32768, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\EventLog\\\\\\\\Security\\\",\\\"Key\\\":\\\"MaxSize\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\": 32768, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":32768,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:31.6600032-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 452,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 453,
    "templateExecutionId": 8,
    "controlId": 324,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 830,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":347,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\Windows Error Reporting\\\",\\\"Key\\\":\\\"Disabled\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\Windows Error Reporting\\\", \\\"Key\\\":\\\"Disabled\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:31.7073239-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 453,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 454,
    "templateExecutionId": 8,
    "controlId": 351,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 831,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":356,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Policies\\\\\\\\Explorer\\\",\\\"Key\\\":\\\"NoWebServices\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Policies\\\\\\\\Explorer\\\", \\\"Key\\\":\\\"NoWebServices\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:31.7457543-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 454,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 455,
    "templateExecutionId": 8,
    "controlId": 361,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 832,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":482,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\Windows NT\\\\\\\\Terminal Services\\\",\\\"Key\\\":\\\"fPromptForPassword\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\Windows NT\\\\\\\\Terminal Services\\\", \\\"Key\\\":\\\"fPromptForPassword\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:31.7917873-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 455,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 456,
    "templateExecutionId": 8,
    "controlId": 404,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 833,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":510,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\WinRM\\\\\\\\Client\\\",\\\"Key\\\":\\\"AllowUnencryptedTraffic\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":0, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\WinRM\\\\\\\\Client\\\", \\\"Key\\\":\\\"AllowUnencryptedTraffic\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":0, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":0,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:31.8490134-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 456,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 457,
    "templateExecutionId": 8,
    "controlId": 465,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 850,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":522,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SYSTEM\\\\\\\\CurrentControlSet\\\\\\\\Services\\\\\\\\Netlogon\\\\\\\\Parameters\\\",\\\"Key\\\":\\\"SignSecureChannel\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SYSTEM\\\\\\\\CurrentControlSet\\\\\\\\Services\\\\\\\\Netlogon\\\\\\\\Parameters\\\", \\\"Key\\\":\\\"SignSecureChannel\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:33.5087759-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 457,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 458,
    "templateExecutionId": 8,
    "controlId": 413,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 834,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":446,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKCU\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Policies\\\\\\\\Attachments\\\",\\\"Key\\\":\\\"ScanWithAntiVirus\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":3, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKCU\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Policies\\\\\\\\Attachments\\\", \\\"Key\\\":\\\"ScanWithAntiVirus\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":3, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":3,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:31.8970172-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 458,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 459,
    "templateExecutionId": 8,
    "controlId": 418,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 836,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":503,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKCU\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\Control Panel\\\\\\\\Desktop\\\",\\\"Key\\\":\\\"ScreenSaverIsSecure\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKCU\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\Control Panel\\\\\\\\Desktop\\\", \\\"Key\\\":\\\"ScreenSaverIsSecure\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:32.0020384-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 459,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 460,
    "templateExecutionId": 8,
    "controlId": 425,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 837,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":501,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\WindowsUpdate\\\\\\\\AU\\\",\\\"Key\\\":\\\"ScheduledInstallDay\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":0, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\WindowsUpdate\\\\\\\\AU\\\", \\\"Key\\\":\\\"ScheduledInstallDay\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":0, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":0,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:32.0415817-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 460,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 461,
    "templateExecutionId": 8,
    "controlId": 426,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 838,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":504,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\WindowsUpdate\\\\\\\\AU\\\",\\\"Key\\\":\\\"NoAutoUpdate\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\": 1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\WindowsUpdate\\\\\\\\AU\\\", \\\"Key\\\":\\\"NoAutoUpdate\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\": 1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:32.0967946-06:00"
      },
      {
        "id": 839,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 2,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":502,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\WindowsUpdate\\\\\\\\AU\\\",\\\"Key\\\":\\\"AUOptions\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":2, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\WindowsUpdate\\\\\\\\AU\\\", \\\"Key\\\":\\\"AUOptions\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":2, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":2}",
        "valueResult": "{\"Value\":2,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:32.0968491-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 461,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 462,
    "templateExecutionId": 8,
    "controlId": 439,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 840,
        "assetId": 1,
        "controlProcessType": "Policy",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":532,\"ReadOperationType\":2,\"ReadOperation\":\"{ \\\"Path\\\":\\\"System Access\\\", \\\"Name\\\":\\\"EnableGuestAccount\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":\\\"0\\\", \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\" } }\",\"WriteOperationType\":2,\"WriteOperation\":\"{ \\\"Path\\\":\\\"System Access\\\", \\\"Name\\\":\\\"EnableGuestAccount\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":\\\"0\\\"} }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":\"0\",\"LogicExpression\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:32.3684156-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 462,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 463,
    "templateExecutionId": 8,
    "controlId": 441,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 841,
        "assetId": 1,
        "controlProcessType": "Policy",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":533,\"ReadOperationType\":2,\"ReadOperation\":\"{ \\\"Path\\\":\\\"System Access\\\", \\\"Name\\\":\\\"EnableAdminAccount\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":\\\"1\\\", \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\" } }\",\"WriteOperationType\":2,\"WriteOperation\":\"{ \\\"Path\\\":\\\"System Access\\\", \\\"Name\\\":\\\"EnableAdminAccount\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":\\\"1\\\"} }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":\"1\",\"LogicExpression\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:32.6251996-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 463,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 464,
    "templateExecutionId": 8,
    "controlId": 444,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 842,
        "assetId": 1,
        "controlProcessType": "Policy",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":559,\"ReadOperationType\":2,\"ReadOperation\":\"{ \\\"Path\\\":\\\"Privilege Rights\\\", \\\"Name\\\":\\\"SeShutdownPrivilege\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":\\\"*S-1-5-32-544\\\", \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\" } }\",\"WriteOperationType\":2,\"WriteOperation\":\"{ \\\"Path\\\":\\\"Privilege Rights\\\", \\\"Name\\\":\\\"SeShutdownPrivilege\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":\\\"*S-1-5-32-544\\\"} }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":\"*S-1-5-32-544\",\"LogicExpression\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:32.898108-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 464,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 465,
    "templateExecutionId": 8,
    "controlId": 445,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 843,
        "assetId": 1,
        "controlProcessType": "Policy",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":581,\"ReadOperationType\":2,\"ReadOperation\":\"{ \\\"Path\\\":\\\"Privilege Rights\\\", \\\"Name\\\":\\\"SeRestorePrivilege\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":\\\"*S-1-5-32-544\\\", \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\" } }\",\"WriteOperationType\":2,\"WriteOperation\":\"{ \\\"Path\\\":\\\"Privilege Rights\\\", \\\"Name\\\":\\\"SeRestorePrivilege\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":\\\"*S-1-5-32-544\\\"} }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":\"*S-1-5-32-544\",\"LogicExpression\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:33.1820058-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 465,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 466,
    "templateExecutionId": 8,
    "controlId": 451,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 844,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":523,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SYSTEM\\\\\\\\CurrentControlSet\\\\\\\\Services\\\\\\\\Netlogon\\\\\\\\Parameters\\\",\\\"Key\\\":\\\"SealSecureChannel\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SYSTEM\\\\\\\\CurrentControlSet\\\\\\\\Services\\\\\\\\Netlogon\\\\\\\\Parameters\\\", \\\"Key\\\":\\\"SealSecureChannel\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:33.2223453-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 466,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 467,
    "templateExecutionId": 8,
    "controlId": 458,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 845,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":524,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SYSTEM\\\\\\\\CurrentControlSet\\\\\\\\Services\\\\\\\\Netlogon\\\\\\\\Parameters\\\",\\\"Key\\\":\\\"RequireSignOrSeal\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SYSTEM\\\\\\\\CurrentControlSet\\\\\\\\Services\\\\\\\\Netlogon\\\\\\\\Parameters\\\", \\\"Key\\\":\\\"RequireSignOrSeal\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:33.2705833-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 467,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 468,
    "templateExecutionId": 8,
    "controlId": 460,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 846,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":517,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Policies\\\\\\\\System\\\",\\\"Key\\\":\\\"DisableCAD\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":0, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Policies\\\\\\\\System\\\", \\\"Key\\\":\\\"DisableCAD\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":0, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":0,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:33.3149876-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 468,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 469,
    "templateExecutionId": 8,
    "controlId": 462,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 847,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":519,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SYSTEM\\\\\\\\CurrentControlSet\\\\\\\\Services\\\\\\\\Netlogon\\\\\\\\Parameters\\\",\\\"Key\\\":\\\"RequireStrongKey\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SYSTEM\\\\\\\\CurrentControlSet\\\\\\\\Services\\\\\\\\Netlogon\\\\\\\\Parameters\\\", \\\"Key\\\":\\\"RequireStrongKey\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:33.3606324-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 469,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 470,
    "templateExecutionId": 8,
    "controlId": 463,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 848,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":520,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SYSTEM\\\\\\\\CurrentControlSet\\\\\\\\Services\\\\\\\\Netlogon\\\\\\\\Parameters\\\",\\\"Key\\\":\\\"MaximumPasswordAge\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":30, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SYSTEM\\\\\\\\CurrentControlSet\\\\\\\\Services\\\\\\\\Netlogon\\\\\\\\Parameters\\\", \\\"Key\\\":\\\"MaximumPasswordAge\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":30, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":30,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:33.409741-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 470,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 471,
    "templateExecutionId": 8,
    "controlId": 416,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 835,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":460,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKCU\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\Assistance\\\\\\\\Client\\\\\\\\1.0\\\",\\\"Key\\\":\\\"NoImplicitFeedback\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKCU\\\\\\\\SOFTWARE\\\\\\\\Policies\\\\\\\\Microsoft\\\\\\\\Assistance\\\\\\\\Client\\\\\\\\1.0\\\", \\\"Key\\\":\\\"NoImplicitFeedback\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:31.9513984-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 471,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  },
  {
    "id": 472,
    "templateExecutionId": 8,
    "controlId": 568,
    "isDisabled": false,
    "controlResultExecutions": [
      {
        "id": 902,
        "assetId": 1,
        "controlProcessType": "Registry",
        "controlProcessOrder": 1,
        "executedProcess": "Assessment",
        "executedOperation": "{\"Id\":651,\"ReadOperationType\":1,\"ReadOperation\":\"{ \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Policies\\\\\\\\System\\\",\\\"Key\\\":\\\"EnableInstallerDetection\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":1, \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\",\\\"ValueType\\\":\\\"0\\\" } }\",\"WriteOperationType\":1,\"WriteOperation\":\"{  \\\"Path\\\":\\\"HKLM\\\\\\\\SOFTWARE\\\\\\\\Microsoft\\\\\\\\Windows\\\\\\\\CurrentVersion\\\\\\\\Policies\\\\\\\\System\\\", \\\"Key\\\":\\\"EnableInstallerDetection\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":1, \\\"ValueType\\\":\\\"0\\\" } }\",\"LastAssessmentValue\":null,\"Order\":1}",
        "valueResult": "{\"Value\":1,\"ValueType\":0,\"LogicExpression\":null,\"ArrayIndex\":null,\"ArrayBytesToTake\":null}",
        "messageResult": "The configuration was verified successfully",
        "exceptionResult": null,
        "status": "SuccessfulExecution",
        "isExpectedResult": true,
        "executionDate": "2025-01-07T20:59:41.5704731-06:00"
      }
    ],
    "controlCommentResults": [],
    "controlExecutionNotifications": [
      {
        "controlExecutionId": 472,
        "assetId": 1,
        "isExpectedResult": true,
        "hasErrors": false,
        "executedProcess": "Assessment"
      }
    ]
  }
];

const executionControls = [
  {
    "id": 444,
    "name": "Apagar el sistema",
    "description": "Esta configuración de directiva determina cuáles de los usuarios que han iniciado sesión localmente en los equipos pueden apagar el sistema operativo con el comando Apagar.",
    "groupName": "Asignación de derechos de usuario",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 533,
    "name": "Asegúrese de que \"Authorization Policy Change\" esté configurado como \"Success\"",
    "description": "Esta subcategoría reporta cambios en la política de autorización.",
    "groupName": "Cambio en la Política",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 515,
    "name": "Asegúrese de que \"Desactivar Windows Defender AntiVirus\" esté configurado como \"Disabled\"",
    "description": "Esta configuración de directiva desactiva Windows Defender Antivirus. Si la configuración está configurada en Deshabilitada, Windows Defender Antivirus se ejecuta y las computadoras se analizan en busca de malware y otro software potencialmente no deseado.",
    "groupName": "Plantillas administrativas (Computador)",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 307,
    "name": "Asegúrese de que \"Security: Controle el comportamiento del registro de eventos cuando el archivo de registro alcance su tamaño máximo\" está configurado como \"Desactivado\"",
    "description": "Esta configuración de directiva controla el comportamiento del Registro de eventos cuando el archivo de registro alcanza su tamaño máximo.",
    "groupName": "Security",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 321,
    "name": "Asegúrese de que \"Security: especifique el tamaño máximo de archivo de registro (KB)\" está configurado como \"Habilitado: 32,768 o superior\"",
    "description": "Esta configuración de directiva especifica el tamaño máximo del archivo de registro en kilobytes. El tamaño máximo del archivo de registro se puede configurar entre 1 megabyte (1,024 kilobytes) y 4 terabytes (4,194,240 kilobytes) en incrementos de kilobytes.",
    "groupName": "Security",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 361,
    "name": "Asegúrese de que \"Solicitar siempre la contraseña al conectarse\" esté configurado como \"Habilitado\"",
    "description": "Esta configuración de directiva especifica si los Servicios de Escritorio remoto siempre solicitan una contraseña al equipo cliente al conectarse. Puede usar esta configuración de directiva para aplicar una solicitud de contraseña para los usuarios que inician sesión en los Servicios de Escritorio remoto, incluso si ya proporcionaron la contraseña en el cliente de Conexión a Escritorio remoto.",
    "groupName": "Security",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 534,
    "name": "Auditar Cambio en la política de autenticación",
    "description": "Esta subcategoría reporta cambios en la política de autenticación",
    "groupName": "Cambio en la Política",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 512,
    "name": "Auditoría de bloqueo de cuentas",
    "description": "Esta subcategoría reporta cuando la cuenta de un usuario quedará bloqueada como resultado de demasiados intentos de conexión fallidos.",
    "groupName": "Inicio / Cierre de Sesión",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 535,
    "name": "Auditoría de cambios en la política de auditoría",
    "description": "Esta subcategoría reporta cambios en la política de auditoría, incluyendo cambios SACL",
    "groupName": "Cambio en la Política",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 522,
    "name": "Auditoría de cierre de sesión",
    "description": "Esta subcategoría reporta cuando un usuario cierra la sesión en el sistema. Estos eventos se producen en el equipo visitado.",
    "groupName": "Inicio / Cierre de Sesión",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 530,
    "name": "Auditoría de inicio de sesión",
    "description": "Esta subcategoría reporta cuando un usuario intenta iniciar sesión en el sistema. Estos eventos se producen en el equipo visitado.",
    "groupName": "Inicio / Cierre de Sesión",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 537,
    "name": "Auditoría de inicio de sesión especial",
    "description": "Esta subcategoría reporta cuando se utiliza un inicio de sesión especial. Un inicio de sesión especial es un inicio de sesión que tiene privilegios de administrador-equivalente y se puede utilizar para elevar un proceso a un nivel superior",
    "groupName": "Inicio / Cierre de Sesión",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 523,
    "name": "Auditoría de otros Eventos de Inicio / Cierre de Sesión",
    "description": "Esta subcategoría reporta otros eventos relacionados con inicio de sesión / cierre de sesión, tales como Servicios de Terminal Server cuando se desconecta y vuelve a conectar la sesión, utilizando RunAs para ejecutar procesos con una cuenta diferente, y el bloqueo y desbloqueo de una estación de trabajo.",
    "groupName": "Inicio / Cierre de Sesión",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 471,
    "name": "Cambiar la hora del sistema",
    "description": "Esta configuración de directiva determina qué usuarios y grupos pueden cambiar la fecha y la hora en el reloj interno de los equipos de su entorno.",
    "groupName": "Asignación de derechos de usuario",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 470,
    "name": "Cambiar la zona horaria",
    "description": "Este ajuste determina los usuarios que pueden cambiar la zona horaria del ordenador",
    "groupName": "Asignación de derechos de usuario",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 464,
    "name": "Cambio de contraseña para una cuenta de equipo",
    "description": "Esta configuración de directiva determina si un miembro de dominio puede cambiar periódicamente su contraseña de cuenta de equipo.",
    "groupName": "Miembro de Dominio",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 489,
    "name": "Carga y descarga de controladores de dispositivos",
    "description": "Esta configuración de directiva permite a los usuarios cargar dinámicamente un nuevo controlador de dispositivo en un sistema",
    "groupName": "Asignación de derechos de usuario",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 451,
    "name": "Cifrar digitalmente datos de un canal seguro (cuando sea posible)",
    "description": "Esta configuración de directiva determina si un miembro de dominio debe intentar negociar el cifrado de todo el tráfico de canal seguro que inicie.",
    "groupName": "Miembro de Dominio",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 458,
    "name": "Cifrar o firmar digitalmente datos en un canal seguro (siempre)",
    "description": "Esta configuración de directiva determina si todo el tráfico de canal seguro que es iniciado por el miembro de dominio debe estar firmado o cifrado",
    "groupName": "Miembro de Dominio",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 517,
    "name": "Conexiones Entrantes",
    "description": "Esta configuración determina el comportamiento para las conexiones entrantes que no coinciden con una regla de cortafuegos entrante",
    "groupName": "Perfíl Público",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 516,
    "name": "Conexiones salientes",
    "description": "Esta configuración determina el comportamiento para las conexiones salientes que no coinciden con una regla de cortafuegos entrante",
    "groupName": "Perfíl Público",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 426,
    "name": "Configurar Actualizaciones Automáticas",
    "description": "Esta configuración de directiva especifica si los equipos del entorno recibirán actualizaciones de seguridad desde Windows Update ó WSUS",
    "groupName": "Plantillas administrativas (Computador)",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 425,
    "name": "Configurar Actualizaciones Automáticas: Instalación programada díaria",
    "description": "Esta configuración de directiva especifica si los equipos del entorno recibirán actualizaciones de seguridad desde Windows Update ó WSUS",
    "groupName": "Plantillas administrativas (Computador)",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 351,
    "name": "Desactivar descargas de Internet para la publicación en Web y asistentes de pedidos en línea",
    "description": "Esta configuración de directiva controla si Windows descargará una lista de proveedores para la publicación en Web y asistentes de pedidos en línea",
    "groupName": "Plantillas administrativas (Computador)",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 324,
    "name": "Desactivar Informe de errores de Windows",
    "description": "Esta configuración de directiva controla si los errores son reportados a Microsoft",
    "groupName": "Plantillas administrativas (Computador)",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 290,
    "name": "Desactivar los gadgets de escritorio",
    "description": "Esta configuración de directiva le permite desactivar los gadgets de escritorio. Los gadgets son pequeños applets que muestran información o utilidades en el escritorio.",
    "groupName": "Gadgets de escritorio",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 296,
    "name": "Desactivar los gadgets de escritorio instalados por los usuarios",
    "description": "Esta configuración de directiva le permite desactivar los gadgets de escritorio que ha instalado el usuario.",
    "groupName": "Gadgets de escritorio",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 416,
    "name": "Desactive Ayuda del Programa de mejora de la experiencia",
    "description": "Esta configuración de directiva especifica si los usuarios pueden participar en el programa Ayuda de mejora de la experiencia. ",
    "groupName": "Plantillas administrativas (Usuario)",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 568,
    "name": "Detectar instalaciones de aplicaciones y pedir confirmación de elevación",
    "description": "Esta configuración de directiva controla el comportamiento de la detección de instalación de la aplicación para el ordenador.",
    "groupName": "Control de Cuentas de Usuario",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 463,
    "name": "Edad máxima permitida para una contraseña de cuenta de equipo.",
    "description": "Esta configuración de directiva determina la edad máxima permitida para una contraseña de cuenta de equipo.",
    "groupName": "Miembro de Dominio",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 481,
    "name": "Establecer el umbral de bloqueo de cuentas a 10 intentos no válidos de inicio de sesión",
    "description": "Esta configuración de directiva determina el número de intentos de conexión fallidos antes de que la cuenta sea bloqueada.",
    "groupName": "Política de bloqueo de cuentas",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 289,
    "name": "Establecer la \"edad mínima” de la contraseña a 1 día",
    "description": "Esta configuración de directiva determina el número de días que debe utilizar una contraseña antes de poder cambiarlo.",
    "groupName": "Política de contraseñas",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 480,
    "name": "Establecer la duración del bloqueo de cuenta a 15 minutos",
    "description": "Esta configuración de directiva determina el tiempo que debe transcurrir antes de que una cuenta bloqueada se desbloquea y un usuario puede intentar iniciar sesión de nuevo.",
    "groupName": "Política de bloqueo de cuentas",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 482,
    "name": "Establecer la opción de almacenar contraseñas usando cifrado reversible a deshabilitado",
    "description": "Esta configuración de directiva determina si el sistema operativo almacena las contraseñas de una manera que utiliza cifrado reversible.",
    "groupName": "Política de contraseñas",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 483,
    "name": "Establecer los requerimientos de complejidad de contraseñas a ‘Habilitado’",
    "description": "Esta configuración de directiva determina el número mínimo de caracteres que componen una contraseña para una cuenta de usuario.",
    "groupName": "Política de contraseñas",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 560,
    "name": "Estado de Firewall",
    "description": "Seleccione Activado (recomendado) para que el Firewall de Windows con seguridad avanzada utilice la configuración de este perfil para filtrar el tráfico de red. Si selecciona Desactivado, el Firewall de Windows con seguridad avanzada no utilizará ninguna de las reglas del cortafuegos o reglas de seguridad de conexión para este perfil",
    "groupName": "Perfíl Privado",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 518,
    "name": "Estado de Firewall",
    "description": "Seleccione Activado (recomendado) para que el Firewall de Windows con seguridad avanzada utilice la configuración de este perfil para filtrar el tráfico de red. Si selecciona Desactivado, el Firewall de Windows con seguridad avanzada no utilizará ninguna de las reglas del cortafuegos o reglas de seguridad de conexión para este perfil",
    "groupName": "Perfíl Público",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 441,
    "name": "Estado de la cuenta Administrador.",
    "description": "Esta configuración de directiva habilita o deshabilita la cuenta de administrador durante el funcionamiento normal (excepto en modo seguro).",
    "groupName": "Opciones de seguridad.",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 439,
    "name": "Estado de la cuenta invitado.",
    "description": "En este control se recomienda deshabilitar la cuenta invitado.",
    "groupName": "Opciones de seguridad.",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 465,
    "name": "Firmar digitalmente datos de un canal seguro (cuando sea posible)",
    "description": "Esta configuración de directiva determina si un miembro de dominio debe intentar negociar si todo el tráfico de canal seguro que inicie debe ser firmado digitalmente.",
    "groupName": "Miembro de Dominio",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 418,
    "name": "Forzar protector de pantalla específico",
    "description": "Esta configuración de directiva le permite administrar, si o no, los protectores de pantalla se ejecutan.",
    "groupName": "Plantillas administrativas (Usuario)",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 552,
    "name": "No permitir almacenamiento de contraseñas y credenciales para autenticación de red.",
    "description": "Esta configuración de directiva determina si el Almacen de Nombres de Usuario y contraseñas pueden tener la característica de guardar las contraseñas y credenciales para su uso posterior cuando ontiene la autenticación de dominio",
    "groupName": "Acceso de Red",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 460,
    "name": "No solicitar CTRL + ALT + DEL",
    "description": "Esta configuración de directiva determina si los usuarios deben presionar CTRL + ALT + DEL antes de que inicien sesión.",
    "groupName": "Inicio de sesión interactivo",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 413,
    "name": "Notificar a los programas antivirus cuando se abren archivos adjuntos",
    "description": "Los programas antivirus son obligatorios en muchos ambientes y proporcionan una fuerte defensa contra el ataque",
    "groupName": "Plantillas administrativas (Usuario)",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 551,
    "name": "Permitir que los permisos Everyone se apliquen a los usuarios anónimos",
    "description": "Esta configuración de directiva determina qué permisos adicionales se asignan para conexiones anónimas al equipo.",
    "groupName": "Acceso de Red",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 555,
    "name": "Permitir traducción anónima de SID/Nombre",
    "description": "Esta configuración de directiva determina si un usuario anónimo puede solicitar identificador de seguridad (SID) atribuible a otro usuario, o utilizar un SID para obtener su correspondiente nombre de usuario.",
    "groupName": "Acceso de Red",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 404,
    "name": "Permitir Tráfico no cifrado",
    "description": "Esta configuración de directiva le permite gestionar si el cliente de Administración Remota de Windows (WinRM) envía y recibe mensajes sin encriptar sobre la red",
    "groupName": "Plantillas administrativas (Computador)",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 556,
    "name": "Recursos compartidos que pueden ser compartidos anónimamente",
    "description": "Esta configuración de directiva determina qué recursos compartidos de la red pueden ser  accedidos por usuarios anónimos.",
    "groupName": "Acceso de Red",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 549,
    "name": "Recursos compartidos y modelo de seguridad para cuentas locales",
    "description": "Esta configuración de directiva determina cómo se autentican los inicios de sesión de red que utilizan cuentas locales.",
    "groupName": "Acceso de Red",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 540,
    "name": "Registro: Nombre",
    "description": "Utilice esta opción para especificar la ruta y el nombre del archivo en el que el Firewall de Windows escribirá su información de registro.",
    "groupName": "Perfíl Privado",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 519,
    "name": "Registro: Registo exitoso de conexiones",
    "description": "Utilice esta opción para registrar cuando Firewall de Windows con seguridad avanzada permite una conexión entrante.",
    "groupName": "Perfíl Privado",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 462,
    "name": "Requerir llave de sesión fuerte",
    "description": "Cuando se habilita esta configuración de directiva, un canal seguro sólo puede establecerse con controladores de dominio que son capaces de cifrar datos de canal seguro con una clave de sesión fuerte (128 bits).",
    "groupName": "Miembro de Dominio",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 303,
    "name": "Requerir una contraseña cuando un equipo se reactiva (con batería)",
    "description": "Especifica si se solicita al usuario una contraseña cuando el sistema se reanuda de suspensión",
    "groupName": "Plantillas administrativas (Computador)",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 302,
    "name": "Requerir una contraseña cuando un equipo se reactiva (enchufado)",
    "description": "Especifica si se solicita al usuario una contraseña cuando el sistema se reanuda de suspensión.",
    "groupName": "Plantillas administrativas (Computador)",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 557,
    "name": "Requirimientos de firmado LDAP",
    "description": "Esta configuración de directiva determina el nivel de firma de datos que se solicitan en nombre de clientes que emiten solicitudes de enlace LDAP",
    "groupName": "Controlador de Dominio",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 445,
    "name": "Restaurar archivos y directorios",
    "description": "Esta configuración de directiva determina los usuarios que pueden pasar por alto archivo, directorio, registro, y otros permisos de objetos persistentes cuando se restaura una copia de seguridad de archivos y directorios en equipos que ejecutan Windows Vista en su entorno",
    "groupName": "Asignación de derechos de usuario",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 298,
    "name": "Restringir a los clientes RPC no autenticados",
    "description": "Esta configuración de directiva controla cómo el servidor RPC trata los tiempos de ejecución de los clientes RPC no autenticados que se conectan a los servidores RPC ",
    "groupName": "Plantillas administrativas (Computador)",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 550,
    "name": "Restringir acceso anónimo a Named Pipes y Recursos Compartidos",
    "description": "Cuando está activada, esta configuración de directiva restringe el acceso anónimo a sólo aquellas acciones y pipes que se nombran en:\r\nNetwork access: Named pipes that can be accessed anonymously\r\nY\r\nNetwork access: Shares that can be accessed anonymously",
    "groupName": "Acceso de Red",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  },
  {
    "id": 305,
    "name": "Utilizar siempre el inicio de sesión clásico",
    "description": "Esta configuración de directiva obliga al usuario a iniciar sesión en la computadora mediante la pantalla de inicio de sesión clásica. De manera predeterminada, un grupo de trabajo está configurado para usar la pantalla de inicio de sesión simple.",
    "groupName": "Plantillas administrativas (Computador)",
    "criticalness": 3.0,
    "isExecutable": true,
    "isSettable": true,
    "isDisabled": false
  }
];

// GET: Fetch execution asset controls
mock.onGet(/api\/gioto\/executions\/\d+\/assets\/\d+\/controls\//g).reply((config) => {
  try {
    return [200, executionControls];
  } catch (error) {
    console.error('Error fetching asset controls:', error);
    return [500, { message: 'Failed to fetch asset controls' }];
  }
});

// GET: Fetch execution asset control Execution Results
mock.onGet(/api\/gioto\/executions\/\d+\/assets\/\d+\/results\//g).reply((config) => {
  try {
    return [200, executionControlResults];
  } catch (error) {
    console.error('Error fetching asset controls:', error);
    return [500, { message: 'Failed to fetch asset controls' }];
  }
});

// GET: Fetch execution assets
mock.onGet(/api\/gioto\/executions\/\d+\/assets\//g).reply((config) => {
  try {
    return [200, executionAssets];
  } catch (error) {
    console.error('Error fetching asset controls:', error);
    return [500, { message: 'Failed to fetch asset controls' }];
  }
});
// GET: Fetch details of a specific execution
mock.onGet(/api\/gioto\/executions\/\d+/g).reply((config) => {
  try {
    const executionId = parseInt(config.url!.split('/').pop()!, 10);

    const execution = executions.find((e) => e.id === executionId);
    if (!execution) {
      return [404, { message: 'Execution not found' }];
    }

    return [200, execution];
  } catch (error) {
    console.error('Error in fetching execution details:', error);
    return [500, { message: 'Failed to fetch execution details' }];
  }
});





// POST: Create a new asset
mock.onPost('api/gioto/executions/').reply((config) => {
  try {
    //@ts-ignore
    const {
      templateId,
      projectId,
      groupId,
      startAssessment,
    } = JSON.parse(config.data);

    const newExecution = {
      id: executions.length + 1,
      creationDate: new Date().toISOString(),
      executionDate: null,
      status: 'Registered',
      processToExecute: 'Assessment',
      userRequesting: 'admin'
    };
    executions.push(newExecution); // Add new asset to mock database
    return [200, newExecution];
  } catch (error) {
    console.error('Error in creating asset:', error);
    return [500, { message: 'Failed to create asset' }];
  }
});

// PUT: Update an existing asset
mock.onPut(new RegExp('api/gioto/executions/*')).reply((config) => {
  try {
    const executionId = config.url!.split('/').pop();
    const updatedData = JSON.parse(config.data);

    const assetIndex = executions.findIndex((execution) => execution.id === Number(executionId));
    if (assetIndex === -1) {
      return [404, { message: 'Asset not found' }];
    }

    executions[assetIndex] = { ...executions[assetIndex], ...updatedData }; // Update the asset

    return [200, executions[assetIndex]];
  } catch (error) {
    console.error('Error updating asset:', error);
    return [500, { message: 'Failed to update asset' }];
  }
});

// DELETE: Delete an asset
mock.onDelete(new RegExp('/api/gioto/executions/*')).reply((config) => {
  try {
    const executionId = config.url!.split('/').pop(); // Extract the asset ID from the URL

    const assetIndex = executions.findIndex((asset) => asset.id === Number(executionId));
    if (assetIndex === -1) {
      return [404, { message: 'Asset not found' }];
    }

    executions.splice(assetIndex, 1); // Remove asset from the mock database

    return [200, { message: 'Asset deleted successfully' }];
  } catch (error) {
    console.error('Error deleting asset:', error);
    return [500, { message: 'Failed to delete asset' }];
  }
});









// GET: Fetch paginated assets
mock.onGet(RegExp('api/gioto/executions')).reply((config) => {
  try {
    const urlParams = new URLSearchParams(config.url!.split('?')[1]);

    const limit = 5;
    const page = parseInt(urlParams.get('page') || '1', 10); // Default to page 1

    const totalAssets = executions.length;
    const totalPages = Math.ceil(totalAssets / limit);
    return [
      200,
      {
        totalItemsAmount: totalAssets,
        pageSize: limit,
        totalPages,
        currentPage: page,
        itemsResult: executions
      }
    ];
  } catch (error) {
    console.error('Error in assets API:', error);
    return [500, { message: 'Internal server error' }];
  }
});