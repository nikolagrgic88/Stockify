import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { Location } from "../../locations";
import { Item } from "../../items";
import { User } from "../../users/services/api";

type PickingListItem = {
  _id: string;
  item: Item;
  quantity: number;
  locations: { location: Location }[];
  orderId: string;
};

export type PickingList = {
  _id: string;
  quantity: number;
  status: string;
  priority: string;
  staff: User;
  notes?: string;
  createdAt: Date;
  listItems: PickingListItem[];
};

Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxP.ttf" },
  ],
});

const styles = StyleSheet.create({
  page: {
    fontFamily: "Roboto",
    fontSize: 12,
    padding: 30,
  },
  heading: {
    fontSize: 18,
    marginBottom: 10,
  },
  section: {
    marginBottom: 10,
  },
  tableHeader: {
    flexDirection: "row",
    fontWeight: "bold",
    borderBottom: "1 solid #ccc",
    marginBottom: 4,
  },
  tableRow: {
    flexDirection: "row",
    marginBottom: 2,
  },
  col: {
    width: "19%",
  },
});

const PickingListPDF = ({ pickingList }: { pickingList: PickingList }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.heading}>Picking List</Text>

      <View style={styles.section}>
        <Text>ID: {pickingList._id}</Text>
        <Text>
          Priority:{" "}
          {pickingList.priority.charAt(0).toLocaleUpperCase() +
            pickingList.priority.slice(1)}
        </Text>
        <Text>Status: {pickingList.status}</Text>
        <Text>Staff ID: {pickingList.staff._id}</Text>
        <Text>Staff User Name: {pickingList.staff.userName}</Text>
        <Text>Notes: {pickingList.notes || "None"}</Text>
      </View>

      <Text style={{ marginBottom: 5 }}>Items:</Text>
      <View style={styles.tableHeader}>
        <Text style={styles.col}>#</Text>
        <Text style={styles.col}>Item ID</Text>
        <Text style={styles.col}>Qty</Text>
        <Text style={styles.col}>Location(s)</Text>
        <Text style={styles.col}>OrderId</Text>
      </View>

      {pickingList.listItems.map((item: PickingListItem, i: number) => (
        <View key={item._id} style={styles.tableRow}>
          <Text style={styles.col}>{i + 1}</Text>
          <Text style={styles.col}>{item.item.title}</Text>
          <Text style={styles.col}>{item.quantity}</Text>
          <Text style={styles.col}>
            {item.locations.map((loc) => loc.location?.name).join(", ")}
          </Text>
          <Text style={styles.col}>{item.orderId}</Text>
        </View>
      ))}
    </Page>
  </Document>
);

export default PickingListPDF;
