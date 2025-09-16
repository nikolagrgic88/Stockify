import { useNavigate } from "react-router";
import AppModal from "./AppModal";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PickingListPDF, { PickingList } from "./PickingListPDF";
import { Button } from "@mui/material";
import GlobalLoader from "./GlobalLoader";

type PDFModalProps = {
  data: {
    pickingList: PickingList;
    message: string;
  };
};

const PDFModal = ({ data }: PDFModalProps) => {
  const navigate = useNavigate();
  const handleAction = () => {
    navigate("/home/actions/orders/history");
  };

  if (!data?.pickingList) {
    return <GlobalLoader />;
  }

  data.pickingList.listItems.map((i) =>
    i.locations.map((l) => console.log(l.location.name))
  );
  return (
    <AppModal modalTitle="Generate PDF Picking List" onCloseNavigateTo="..">
      <div className="p-6">
        <p className="text-xl font-[450] mb-4">{data.message}</p>
        <p className="text-lg ">
          Would you like to generate a PDF picking list for the selected orders?
        </p>
        <div className="flex justify-end gap-4 mt-10">
          <Button
            sx={{
              backgroundColor: "rgb(209 213 219)",
              color: "black",
            }}
            onClick={handleAction}
          >
            Cancel
          </Button>
          <PDFDownloadLink
            document={<PickingListPDF pickingList={data.pickingList} />}
            fileName="picking-list.pdf"
          >
            {({ loading }) => (
              <Button
                variant="contained"
                disabled={loading}
                onClick={handleAction}
              >
                {loading ? "Preparing PDF..." : "Generate PDF"}
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      </div>
    </AppModal>
  );
};

export default PDFModal;
