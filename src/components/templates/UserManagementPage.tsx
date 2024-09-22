"use client";

import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  MRT_ActionMenuItem,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import axios from "axios";
import { Alert, Box, Divider, MenuItem, Typography } from "@mui/material";
import LogoutButton from "../modules/LogoutButton";
import CreateUserModal from "../modules/CreateUserModal";
import UpdateUserModal from "../modules/UpdateUserModal";
import { DeleteForever, Edit } from "@mui/icons-material";
import Image from "next/image";

interface users {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}
interface userDetailsInterface {
  text: string;
  url: string;
}

const UserManagementPage = () => {
  const baseURL = "https://reqres.in/";
  const [data, setData] = useState<users[]>([]);
  const [userDetails, setUserDetails] = useState<userDetailsInterface | null>(
    null
  );
  const [idUpdate, setIdUpdate] = useState<number | null>(null);
  const [nameUpdate, setNameUpdate] = useState<string | null>(null);
  const [nameDelete, setNameDelete] = useState<string | null>(null);
  const [deleteAlert, setDeleteAlert] = useState<boolean>(false);
  // Fetch users--------------------------
  const handleUsers = async (page: number) => {
    await axios
      .get(`${baseURL}api/users?page=${page + 1}`)
      .then((e) => {
        setData(e?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleUsers(0);
  }, []);

  // fetch details of each user by expanding its row -----------------------
  const handleDetails = async (id: number) => {
    await axios
      .get(`${baseURL}api/users/${id}`)
      .then((e) => {
        setUserDetails(e?.data?.support);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // fetch other pages on demand (handle pagination)------------------------
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 6,
  });

  useEffect(() => {
    handleUsers(pagination.pageIndex);
  }, [pagination.pageIndex, pagination.pageSize]);

  // Delete selected user --------------------------------------------------
  const handleDeleteUser = async (id: number) => {
    await axios
      .delete(`${baseURL}api/users/${id}`)
      .then((e) => {
        if (e.status == 204) {
          setDeleteAlert(true);
          setTimeout(() => {
            setDeleteAlert(false);
          }, 4000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ------------------------------------------------------------------------
  const columns = useMemo<MRT_ColumnDef<users>[]>(
    () => [
      {
        accessorKey: "id",
        header: "id",
        size: 150,
      },
      {
        accessorKey: "first_name",
        header: "نام",
        size: 150,
      },
      {
        accessorKey: "last_name",
        header: "نام خانوادگی",
        size: 150,
      },
      {
        accessorKey: "email",
        header: "ایمیل",
        size: 150,
      },
      {
        accessorKey: "avatar",
        header: "عکس",
        size: 150,

        Cell: ({ row }) => (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <Image
              alt="avatar"
              height={90}
              width={90}
              src={row.original.avatar}
              loading="lazy"
              className="rounded-full"
            />
          </Box>
        ),




        
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
    // add styles to the table---------------
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: "#f0f0f0",
        textAlign: "start",
      },
    },
    muiTableBodyCellProps: {
      sx: {
        textAlign: "start",
      },
    },
    // add a menu of action buttons for CRUD----------------
    enableRowActions: true,
    renderRowActionMenuItems: ({ row }) => [
      <MenuItem
        key="edit"
        onClick={() => {
          setIdUpdate(row.original.id);
          setNameUpdate(row.original.first_name);
        }}
      >
        آپدیت
      </MenuItem>,
      <MenuItem
        className="bg-red-600 text-white hover:bg-red-700"
        key="delete"
        onClick={() => {
          setNameDelete(row.original.first_name);
          handleDeleteUser(row.original.id);
        }}
      >
        حذف
      </MenuItem>,
    ],
    // add details part --------------------
    enableExpandAll: false,
    muiDetailPanelProps: () => ({
      sx: (theme) => ({
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(255,210,244,0.1)"
            : "rgba(0,0,0,0.1)",
      }),
    }),

    muiExpandButtonProps: ({ row, table }) => ({
      onClick: () => {
        table.setExpanded({ [row.id]: !row.getIsExpanded() });
        if (!row.getIsExpanded()) {
          handleDetails(row.original.id);
        }
      },
      sx: {
        transform: row.getIsExpanded() ? "rotate(180deg)" : "rotate(-90deg)",
        transition: "transform 0.2s",
      },
    }),

    renderDetailPanel: ({ row }) =>
      row.original ? (
        <div className="flex flex-col justify-start items-start">
          <h3 className="text-xl font-semibold "> جزییات : </h3>
          <Divider />
          <Typography>{userDetails?.text}</Typography>
          <Typography>{userDetails?.url}</Typography>
        </div>
      ) : null,

    // handle pagination ---------------------
    muiPaginationProps: {
      color: "primary",
      shape: "rounded",
      showRowsPerPage: false,
      variant: "outlined",
    },
    manualPagination: true,
    pageCount: 2,
    paginationDisplayMode: "pages",
    state: {
      pagination: {
        pageIndex: 0,
        pageSize: 6,
      },
    },
    onPaginationChange: setPagination,
    // handle context menu actions --------------
    enableCellActions: true,
    renderCellActionMenuItems: ({ closeMenu, row, table }) => [
      <MRT_ActionMenuItem
        icon={<Edit />}
        key={1}
        label="ویرایش"
        onClick={() => {
          setIdUpdate(row.original.id);
          setNameUpdate(row.original.first_name);
          closeMenu();
        }}
        table={table}
      />,
      <MRT_ActionMenuItem
        icon={<DeleteForever className="text-red-600" />}
        key={2}
        label="حذف"
        onClick={async () => {
          setNameDelete(row.original.first_name);
          handleDeleteUser(row.original.id);
          closeMenu();
        }}
        table={table}
      />,
    ],
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-2 justify-start items-start">
        <LogoutButton />
        <CreateUserModal />
      </div>
      <UpdateUserModal idUpdate={idUpdate} nameUpdate={nameUpdate} />
      <h2 className="mx-3" >
        {" "}
        با کلیک بر روی دکمه{" "}
        <span className="bg-blue-300 p-1 rounded-md">Actions</span> و یا از طریق
        کلیک راست
        <span className="bg-blue-300 p-1 rounded-md">(context menu)</span> می
        توانید به گزینه های حذف و ویرایش دسترسی داشته باشید{" "}
      </h2>
      <MaterialReactTable table={table} />
      <div>
        {deleteAlert ? (
          <Alert
            className="absolute top-3 left-[45%]"
            severity="error"
            variant="filled"
          >
            کاربر {nameDelete} حذف شد!
          </Alert>
        ) : null}
      </div>
    </div>
  );
};

export default UserManagementPage;
