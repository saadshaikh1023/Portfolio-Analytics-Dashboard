import "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, Text, useMantineTheme } from "@mantine/core"
import PropTypes from "prop-types"

function PerformanceChart({ data }) {
  const theme = useMantineTheme()

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text size="xl" weight={700} mb="md" style={{ color: theme.colors.teal[6] }}>
        Portfolio Performance
      </Text>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            contentStyle={{ backgroundColor: theme.colors.dark[7], border: "none" }}
            labelStyle={{ color: theme.colors.gray[5] }}
          />
          <Line type="monotone" dataKey="value" stroke={theme.colors.teal[6]} strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}

PerformanceChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ).isRequired,
}

export default PerformanceChart

