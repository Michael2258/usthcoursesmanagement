import React from "react";
import { GradesGraphContainerSC } from "./GradesGraphContainerSC";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Col, Row } from "reactstrap";
import useGradesCourse from "../../Grades/hooks/useGradesCourse";

const GradesGraphContainer = ({ data }: any) => {
  const { courseGrades } = useGradesCourse();

  const midtermExamData = [
    {
      name: "Failed",
      value: !!courseGrades && (courseGrades?.midtermTestFailed || 0),
    },
    {
      name: "Passed",
      value: !!courseGrades && (100 - courseGrades.midtermTestFailed || 0),
    },
  ];

  const finalExamData = [
    {
      name: "Failed",
      value: !!courseGrades && (courseGrades?.finalTestFailed || 0),
    },
    {
      name: "Passed",
      value: !!courseGrades && (100 - courseGrades.finalTestFailed || 0),
    },
  ];

  const finalData = [
    {
      name: "Failed",
      value: !!courseGrades && (courseGrades?.finalResultFailed || 0),
    },
    {
      name: "Passed",
      value: !!courseGrades && (100 - courseGrades.finalResultFailed || 0),
    },
  ];

  const COLORS = ["#78e46a", "#d63737"];

  const RADIAN = Math.PI / 180;

  return (
    <GradesGraphContainerSC>
      <div className="spectrum">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="gradeLevel"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="count" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
      </div>

      <div className="pie">
        <Row className="pie-row">
          <Col className="midterm-exam">
            <h6>Midterm test result ratio</h6>

            <div className="graph-item">
              <PieChart width={400} height={400}>
                <Pie
                  data={midtermExamData}
                  cx={200}
                  cy={200}
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {midtermExamData.map((entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </Col>

          <Col className="final-exam">
            <h6>Final test result ratio</h6>

            <div className="graph-item">
              <PieChart width={400} height={400}>
                <Pie
                  data={finalExamData}
                  cx={200}
                  cy={200}
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {finalExamData.map((entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </Col>

          <Col className="final-result">
            <h6>Final result ratio</h6>

            <div className="graph-item">
              <PieChart width={400} height={400}>
                <Pie
                  data={finalData}
                  cx={200}
                  cy={200}
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {finalData.map((entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </Col>
        </Row>
      </div>
    </GradesGraphContainerSC>
  );
};

export default GradesGraphContainer;
