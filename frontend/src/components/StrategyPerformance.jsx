// eslint-disable-next-line no-unused-vars
import React from "react"
import { Card, Text, Table, Group, RingProgress, useMantineTheme } from "@mantine/core"
import PropTypes from "prop-types"

function StrategyPerformance({ data }) {
  const theme = useMantineTheme()

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text size="xl" weight={700} mb="md" style={{ color: theme.colors.teal[6] }}>
        Strategy Performance
      </Text>
      <Table>
        <thead>
          <tr>
            <th>Strategy</th>
            <th>ROI</th>
            <th>CAGR</th>
            <th>Drawdown</th>
          </tr>
        </thead>
        <tbody>
          {data.map((strategy, index) => (
            <tr key={index}>
              <td>{strategy.name}</td>
              <td>
                <Group spacing="xs">
                  <RingProgress
                    size={40}
                    roundCaps
                    thickness={4}
                    sections={[{ value: strategy.roi, color: theme.colors.teal[6] }]}
                    label={
                      <Text size="xs" align="center">
                        {strategy.roi}%
                      </Text>
                    }
                  />
                  <Text>{strategy.roi}%</Text>
                </Group>
              </td>
              <td>{strategy.cagr}%</td>
              <td style={{ color: theme.colors.red[6] }}>{strategy.drawdown}%</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  )
}

StrategyPerformance.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      roi: PropTypes.number.isRequired,
      cagr: PropTypes.number.isRequired,
      drawdown: PropTypes.number.isRequired,
    }),
  ).isRequired,
}

export default StrategyPerformance

