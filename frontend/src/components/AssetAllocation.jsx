// eslint-disable-next-line no-unused-vars
import React from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { Card, Text, useMantineTheme } from "@mantine/core"
import PropTypes from "prop-types"

function AssetAllocation({ data }) {
  const theme = useMantineTheme()
  const COLORS = [theme.colors.blue[6], theme.colors.teal[6], theme.colors.orange[6], theme.colors.pink[6]]

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text size="xl" weight={700} mb="md" style={{ color: theme.colors.teal[6] }}>
        Asset Allocation
      </Text>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ backgroundColor: theme.colors.dark[0], border: "none" }}
            labelStyle={{ color: theme.colors.gray[5] }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  )
}

AssetAllocation.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    }),
  ).isRequired,
}

export default AssetAllocation

