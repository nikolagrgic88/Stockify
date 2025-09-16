import { BackButton, PageCard } from "../../shared";
import ActionOrders from "../components/ActionOrders";

const ActionSingleOrdersPage = () => {
  return (
    <PageCard>
      <div>
        <ActionOrders formName="Action Singles Orders" />
        <BackButton />
      </div>
    </PageCard>
  );
};

export default ActionSingleOrdersPage;
