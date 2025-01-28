import "react"
import { Card, Text, Group, RingProgress, Grid, useMantineTheme } from "@mantine/core"
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react"
import PropTypes from "prop-types"

function PortfolioOverview({ data }) {
  const theme = useMantineTheme()

  const cards = [
    { title: "Total Portfolio Value", value: `₹${data.portfolioValue.toLocaleString()}`, color: "teal" },
    { title: "Daily P&L", value: `₹${data.dailyPnL.toLocaleString()}`, color: data.dailyPnL >= 0 ? "green" : "red" },
    { title: "Win Rate", value: `${data.winRate}%`, color: "blue" },
  ]

  return (
    <Grid>
      {cards.map((card, index) => (
        <Grid.Col key={index} span={{ base: 12, sm: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder style={{ height: "100%" }}>
            <Group position="apart" style={{ marginBottom: theme.spacing.sm }}>
              <Text size="xl" weight={500}>
                {card.title}
              </Text>
              {card.title === "Daily P&L" &&
                (data.dailyPnL >= 0 ? (
                  <IconTrendingUp size={24} stroke={1.5} color={theme.colors.green[6]} />
                ) : (
                  <IconTrendingDown size={24} stroke={1.5} color={theme.colors.red[6]} />
                ))}
            </Group>
            <Group align="flex-end" spacing="xs">
              <Text size="xl" weight={700} style={{ color: theme.colors[card.color][6] }}>
                {card.value}
              </Text>
            </Group>
            {card.title === "Win Rate" && (
              <RingProgress
                size={80}
                roundCaps
                thickness={8}
                sections={[{ value: data.winRate, color: theme.colors.blue[6] }]}
                label={
                  <Text size="xs" align="center" weight={700}>
                    {data.winRate}%
                  </Text>
                }
              />
            )}
          </Card>
        </Grid.Col>
      ))}
    </Grid>
  )
}

PortfolioOverview.propTypes = {
  data: PropTypes.shape({
    portfolioValue: PropTypes.number.isRequired,
    dailyPnL: PropTypes.number.isRequired,
    winRate: PropTypes.number.isRequired,
  }).isRequired,
}

export default PortfolioOverview

