import { BackButton, PageCard } from "../../shared";
import ActionOrders from "../components/ActionOrders";

const ActionMultiOrdersPage = () => {
  return (
    <PageCard>
      <div>
        <ActionOrders formName="Action Multi Orders" />
        <BackButton />
      </div>
    </PageCard>
  );
};

export default ActionMultiOrdersPage;
