import { Box, Container, Paper, Typography } from "@mui/material";

import { BarChart } from "@mui/x-charts/BarChart";

import { useQuery } from "@tanstack/react-query";
import { fetchDashboardStats } from "../services/api";
import { fetchUsers } from "../../users/services/api";
import { useMemo } from "react";
import { GlobalLoader, PageCard } from "../../shared";

export type DashboardStats = {
  emptyLocationsPerAisle: { emptyCount: string; section: string }[];
  locationCount: number;
  pendingOrderCount: number;
  productCount: number;
  unusedLocationCount: number;
  usedLocationsPerAisle: { usedCount: string; section: string }[];
  actionedOrders: number;
  pickingItemsPerUser: {
    pickingQuantity: number;
    _id: { firstName: string; lastName: string; _id: string };
  }[];
};

export default function Dashboard() {
  const { data } = useQuery<DashboardStats>({
    queryKey: ["dashboard-stats"],
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      fetchDashboardStats(signal),
  });

  const { data: userData, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: ({ signal }: { signal: AbortSignal }) => fetchUsers({ signal }),
  });

  // Prepare combined data for the bar chart
  const combinedUsersData = useMemo(() => {
    if (!userData?.users || !data) return [];

    return userData.users
      .filter((user) => user.isActive === true)
      .map((user) => {
        const pickingInfo = data.pickingItemsPerUser.find(
          (u) => u._id._id === user._id
        );
        return {
          user:
            user.firstName.charAt(0).toUpperCase() +
            user.firstName.slice(1) +
            " " +
            user.lastName.charAt(0).toUpperCase(),
          picked: pickingInfo ? pickingInfo.pickingQuantity : 0,
        };
      });
  }, [userData, data]);

  const combinedLocationData = useMemo(() => {
    if (!data) return [];
    const emptyMap = new Map(
      data.emptyLocationsPerAisle.map((d) => [
        d.section,
        parseInt(d.emptyCount, 10),
      ])
    );
    const usedMap = new Map(
      data.usedLocationsPerAisle.map((d) => [
        d.section,
        parseInt(d.usedCount, 10),
      ])
    );

    const allSections = Array.from(
      new Set([...emptyMap.keys(), ...usedMap.keys()])
    ).sort();

    return allSections.map((section) => ({
      section,
      emptyCount: emptyMap.get(section) ?? 0,
      usedCount: usedMap.get(section) ?? 0,
    }));
  }, [data]);
  if (isLoading || !userData?.users || !data) {
    return <GlobalLoader />;
  }

  return (
    <PageCard>
      <Container>
        <Typography variant="h5" component="h1" className="text-center pb-10">
          Warehouse Dashboard
        </Typography>
        {/* Top Bar */}
        <Box display="flex" gap={2} mb={4}>
          {[
            { label: "Total Products", value: data?.productCount },
            { label: "Locations", value: data?.locationCount },
            { label: "Orders", value: data?.pendingOrderCount },
            { label: "Actioned Orders", value: data?.actionedOrders },
          ].map((stat) => (
            <Box key={stat.label} flex={1}>
              <Paper elevation={3} sx={{ padding: 2 }}>
                <Typography variant="subtitle1">{stat.label}</Typography>
                <Typography variant="h5" fontWeight="bold">
                  {stat.value}
                </Typography>
              </Paper>
            </Box>
          ))}
        </Box>

        <div className="flex gap-5">
          {/* Location Graf */}
          <Box display={"flex"} flex={1} gap={10}>
            <Paper elevation={3} sx={{ padding: 2, width: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Utilised Locations
              </Typography>

              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: combinedLocationData.map((d) => d.section),
                    label: "Aisle",
                    height: 90,
                    labelStyle: { fontSize: 18 },
                  },
                ]}
                series={[
                  {
                    data: combinedLocationData.map((d) => d.emptyCount),
                    label: "Unused Locations",
                    color: "#005A8D",
                    stack: "utilization",
                  },
                  {
                    data: combinedLocationData.map((d) => d.usedCount),
                    label: "Used Locations",
                    color: "#BFC9CE",
                    stack: "utilization",
                  },
                ]}
                height={450}
              />
            </Paper>
          </Box>

          {/* Users Graph */}

          <Box display={"flex"} flex={1} gap={10}>
            <Paper elevation={3} sx={{ padding: 2, width: "100%" }}>
              <Typography variant="h6" gutterBottom>
                Picked Items
              </Typography>

              <BarChart
                slotProps={{ tooltip: { trigger: "item" } }}
                xAxis={[
                  {
                    scaleType: "band",
                    data: combinedUsersData.map((u) => u.user),
                    label: "User",
                    labelStyle: { fontSize: 18 },
                    tickLabelStyle: {
                      angle: -45,
                      dominantBaseline: "hanging",
                      textAnchor: "end",
                      fontSize: 12,
                    },
                    height: 90,
                  },
                ]}
                yAxis={[
                  {
                    label: "Picked Items",
                    labelStyle: { fontSize: 18 },
                  },
                ]}
                series={[
                  {
                    data: combinedUsersData.map((p) => p.picked),
                    label: "Picked Items",
                    color: "#005A8D",
                    stack: "utilization",
                  },
                ]}
                height={450}
              />
            </Paper>
          </Box>
        </div>
      </Container>
    </PageCard>
  );
}
