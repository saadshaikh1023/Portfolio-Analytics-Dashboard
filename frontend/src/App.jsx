import  { useState, useEffect } from "react"
import { AppShell, Burger, Group, Text, Button, rem, Box, Transition } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconChartBar, IconWallet, IconChartPie, IconBriefcase, IconHistory } from "@tabler/icons-react"
import PortfolioOverview from "./components/PortfolioOverview"
import PerformanceChart from "./components/PerformanceChart"
import AssetAllocation from "./components/AssetAllocation"
import StrategyPerformance from "./components/StrategyPerformance"
import RecentTrades from "./components/RecentTrades"

const HEADER_HEIGHT = rem(60)

function App() {
  const [opened, { toggle }] = useDisclosure()
  const [data, setData] = useState(null)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    fetch("http://localhost:5000/api/portfolio-data")
      .then((response) => response.json())
      .then((data) => setData(data))
  }, [])

  if (!data) return <div>Loading...</div>

  const navItems = [
    { icon: IconChartBar, label: "Overview", value: "overview" },
    { icon: IconWallet, label: "Performance", value: "performance" },
    { icon: IconChartPie, label: "Allocation", value: "allocation" },
    { icon: IconBriefcase, label: "Strategies", value: "strategies" },
    { icon: IconHistory, label: "Recent Trades", value: "trades" },
  ]

  return (
    <AppShell
      header={{ height: HEADER_HEIGHT }}
      navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md" style={{ justifyContent: "space-between" }}>
          <Group>
            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Text
              size="xl"
              fw={700}
              color="#000000"
            >
              Moneyy.ai Analytics
            </Text>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar
        p="md"
        style={{
          background: "#FFFFFF",
        }}
      >
        {navItems.map((item) => (
          <Button
            key={item.value}
            leftIcon={<item.icon size="1.2rem" />}
            variant={activeTab === item.value ? "light" : "subtle"}
            color={activeTab === item.value ? "teal" : "gray"}
            fullWidth
            style={{ justifyContent: "flex-start", marginBottom: "0.5rem" }}
            onClick={() => setActiveTab(item.value)}
          >
            {item.label}
          </Button>
        ))}
      </AppShell.Navbar>
      <AppShell.Main style={{ background: "#FFFFFF" }}>
        <Transition mounted={activeTab === "overview"} transition="fade" duration={400} timingFunction="ease">
          {(styles) => (
            <Box style={styles}>
              <PortfolioOverview data={data} />
            </Box>
          )}
        </Transition>
        <Transition mounted={activeTab === "performance"} transition="fade" duration={400} timingFunction="ease">
          {(styles) => (
            <Box style={styles}>
              <PerformanceChart data={data.performanceData} />
            </Box>
          )}
        </Transition>
        <Transition mounted={activeTab === "allocation"} transition="fade" duration={400} timingFunction="ease">
          {(styles) => (
            <Box style={styles}>
              <AssetAllocation data={data.assetAllocation} />
            </Box>
          )}
        </Transition>
        <Transition mounted={activeTab === "strategies"} transition="fade" duration={400} timingFunction="ease">
          {(styles) => (
            <Box style={styles}>
              <StrategyPerformance data={data.strategies} />
            </Box>
          )}
        </Transition>
        <Transition mounted={activeTab === "trades"} transition="fade" duration={400} timingFunction="ease">
          {(styles) => (
            <Box style={styles}>
              <RecentTrades data={data.recentTrades} />
            </Box>
          )}
        </Transition>
      </AppShell.Main>
    </AppShell>
  )
}

export default App

