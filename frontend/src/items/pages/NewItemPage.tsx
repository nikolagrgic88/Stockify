import { FC, useEffect } from "react";
import ItemsContainer from "../components/ItemsContainer";
import { useItemLocationState } from "../../state/itemLocationStore";
import { PageCard } from "../../shared";

const NewItemPage: FC = () => {
  const { resetQuantity } = useItemLocationState((state) => state);

  useEffect(() => {
    resetQuantity();
    //eslint-disable-next-line
  }, []);
  return (
    <PageCard>
      <ItemsContainer form="POST" isNewItem={true} />
    </PageCard>
  );
};

export default NewItemPage;
