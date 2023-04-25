import { IoBarChartSharp } from "react-icons/io5";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FaWpforms } from "react-icons/fa";
import { HiOutlineNewspaper } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";

const links = [
  {
    id: 1,
    text: "stats",
    path: "/",
    icon: <IoBarChartSharp />,
    restricted: false,
  },
  {
    id: 2,
    text: "view tasks",
    path: "/view-tasks",
    icon: <HiMagnifyingGlass />,
    restricted: false,
  },
  {
    id: 3,
    text: "add task",
    path: "/add-task",
    icon: <FaWpforms />,
    restricted: true,
  },
  {
    id: 4,
    text: "results",
    path: "/results",
    icon: <HiOutlineNewspaper />,
    restricted: false,
  },
  {
    id: 5,
    text: "profile",
    path: "/profile",
    icon: <CgProfile />,
    restricted: false,
  },
];

export default links;
