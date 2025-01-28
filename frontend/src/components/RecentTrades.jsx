// eslint-disable-next-line no-unused-vars
import React from "react"
import { Card, Text, Table, Badge, useMantineTheme } from "@mantine/core"
import PropTypes from "prop-types"

function RecentTrades({ data }) {
  const theme = useMantineTheme()

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text size="xl" weight={700} mb="md" style={{ color: theme.colors.teal[6] }}>
        Recent Trades
      </Text>
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Asset</th>
            <th>Action</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((trade, index) => (
            <tr key={index}>
              <td>{trade.date}</td>
              <td>{trade.asset}</td>
              <td>
                <Badge color={trade.action === "Buy" ? "green" : "red"} variant="light">
                  {trade.action}
                </Badge>
              </td>
              <td>₹{trade.amount.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  )
}

RecentTrades.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      asset: PropTypes.string.isRequired,
      action: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    }),
  ).isRequired,
}

export default RecentTrades

