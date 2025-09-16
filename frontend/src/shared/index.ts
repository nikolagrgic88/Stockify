import { useIsCurrentPage } from "./hooks/useIsCurrentPage";
import Aside from "./components/Aside";
import AuthFormWrapper from "./components/AuthFormWrapper";
import MainFooter from "./components/MainFooter";
import MainHeader from "./components/MainHeader";
import {
  BASE_URL,
  API_INVENTORY_URL,
  API_LOCATION_URL,
  API_MOVEMENT_URL,
  API_PRODUCTS_URL,
  API_USERS_URL,
} from "./constants/urls";
import { queryClient } from "./utils/http";
import AppModal from "./components/AppModal";
import BackButton from "./components/BackButton";
import { useBorderColor } from "./hooks/useBorderColor";
import GlobalLoader from "./components/GlobalLoader";
import FormAlert from "./components/FormAlert";
import DeletePage from "./components/DeletePage";
import FallbackPage from "./pages/ErrorPage";
import { useFetchedData } from "./hooks/useFetchedData";
import PDFModal from "./components/PDFModal";
import PageCard from "./components/PageCard";

export {
  PDFModal,
  Aside,
  AuthFormWrapper,
  MainFooter,
  MainHeader,
  BASE_URL,
  API_INVENTORY_URL,
  API_LOCATION_URL,
  API_MOVEMENT_URL,
  API_PRODUCTS_URL,
  API_USERS_URL,
  queryClient,
  AppModal,
  BackButton,
  useIsCurrentPage,
  useBorderColor,
  GlobalLoader,
  FormAlert,
  DeletePage,
  FallbackPage,
  useFetchedData,
  PageCard,
};
