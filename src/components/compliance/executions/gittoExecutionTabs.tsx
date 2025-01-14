import { Box, Grid, Tab, Tabs, Typography } from "@mui/material";
import { parseISO } from "date-fns";
import { useState } from "react";
import HumanizedDate from "src/components/shared/HumanizedDate";

//[{"id":842,"assetId":1,"controlProcessType":"Policy","controlProcessOrder":1,"executedProcess":"Assessment","executedOperation":"{\"Id\":559,\"ReadOperationType\":2,\"ReadOperation\":\"{ \\\"Path\\\":\\\"Privilege Rights\\\", \\\"Name\\\":\\\"SeShutdownPrivilege\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":\\\"*S-1-5-32-544\\\", \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\" } }\",\"WriteOperationType\":2,\"WriteOperation\":\"{ \\\"Path\\\":\\\"Privilege Rights\\\", \\\"Name\\\":\\\"SeShutdownPrivilege\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":\\\"*S-1-5-32-544\\\"} }\",\"LastAssessmentValue\":null,\"Order\":1}","valueResult":"{\"Value\":\"*S-1-5-32-544\",\"LogicExpression\":null}","messageResult":"The configuration was verified successfully","exceptionResult":null,"status":"SuccessfulExecution","isExpectedResult":true,"executionDate":"2025-01-07T20:59:32.898108-06:00"},{"id":842,"assetId":1,"controlProcessType":"Policy","controlProcessOrder":1,"executedProcess":"Hardening","executedOperation":"{\"Id\":559,\"ReadOperationType\":2,\"ReadOperation\":\"{ \\\"Path\\\":\\\"Privilege Rights\\\", \\\"Name\\\":\\\"SeShutdownPrivilege\\\", \\\"ExpectedValue\\\":{ \\\"Value\\\":\\\"*S-1-5-32-544\\\", \\\"LogicExpression\\\":\\\"readOperationValue == expectedValue\\\" } }\",\"WriteOperationType\":2,\"WriteOperation\":\"{ \\\"Path\\\":\\\"Privilege Rights\\\", \\\"Name\\\":\\\"SeShutdownPrivilege\\\", \\\"ValueToWrite\\\":{ \\\"Value\\\":\\\"*S-1-5-32-544\\\"} }\",\"LastAssessmentValue\":null,\"Order\":1}","valueResult":"{\"Value\":\"*S-1-5-32-544\",\"LogicExpression\":null}","messageResult":"The configuration was verified successfully","exceptionResult":null,"status":"SuccessfulExecution","isExpectedResult":true,"executionDate":"2025-01-07T20:59:32.898108-06:00"}]
interface ControlResultExecutions {
  id: number;
  assetId: number;
  controlProcessType: string;
  controlProcessOrder: number;
  executedProcess: string;
  executedOperation: string;
  valueResult: string;
  messageResult: string;
  exceptionResult: string;
  status: string;
  isExpectedResult: boolean;
  executionDate: string;
}

interface GiottoExecutionTabsProps {
  tabs: ControlResultExecutions[];
}

const GiottoExecutionTabs: React.FC<GiottoExecutionTabsProps> = ({ tabs }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
  };

  // Parse the `valueResult` JSON string
  const parseValueResult = (valueResult: string) => {
    try {
      const parsed = JSON.parse(valueResult);
      return parsed;
    } catch (error) {
      return null; // Return null if parsing fails
    }
  };

  const currentValueResult = parseValueResult(tabs[selectedTab].valueResult);

  return (
    <Box>
      <Box>
        <Tabs value={selectedTab} onChange={(_, index) => handleTabClick(index)}>
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              value={index}
              label={tab.executedProcess}
            />
          ))}
        </Tabs>
      </Box>
      {/* Tab Content */}
      {tabs.length > 0 && (
        <Box sx={{ padding: 2 }}>
          <Grid container spacing={2}>
            {/* Status */}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{
                  color: tabs[selectedTab].status === "SuccessfulExecution" ? "green" : "red",
                }}
              >
                <strong>Status:</strong> {tabs[selectedTab].status}
              </Typography>
            </Grid>

            {/* Execution Date */}
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Execution Date:</strong> {parseISO(tabs[selectedTab].executionDate).toLocaleString()} {" | "}<HumanizedDate dateString={tabs[selectedTab].executionDate} />
              </Typography>
            </Grid>

            {/* Expected Result */}
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Expected Result:</strong>{" "}
                {tabs[selectedTab].isExpectedResult ? (
                  <Typography component="span" sx={{ color: "green" }}>
                    Yes
                  </Typography>
                ) : (
                  <Typography component="span" sx={{ color: "red" }}>
                    No
                  </Typography>
                )}
              </Typography>
            </Grid>

            {/* Message Result */}
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Message Result:</strong> {tabs[selectedTab].messageResult}
              </Typography>
            </Grid>

            {/* Value Result */}
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Value Result:</strong>
              </Typography>
              {currentValueResult ? (
                <Typography variant="body2">
                  {currentValueResult.Value}
                </Typography>
              ) : (
                <Typography variant="body2" sx={{ color: "red" }}>
                  Invalid Value Result
                </Typography>
              )}
            </Grid>

            {/* Exception Result (if exists) */}
            {tabs[selectedTab].exceptionResult && (
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ color: "red" }}>
                  <strong>Exception Result:</strong> {tabs[selectedTab].exceptionResult}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default GiottoExecutionTabs;