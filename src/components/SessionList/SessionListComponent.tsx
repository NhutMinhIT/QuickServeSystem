import { MRT_ColumnDef } from "material-react-table"
import { ISession } from "../../models/Session"
import { useAppDispatch, useAppSelector } from "../../services/store/store";
import { useEffect, useState } from "react";
import { deleteSession, getAllSessions } from "../../services/features/sessionSlice";
import { Button, Stack } from "@mui/material";
import CommonTable from "../CommonTable/CommonTable";
import PopupCreateSession from "./popup-features/PopCreateSession";
import PopupDetailSession from "./popup-features/PopupDetailSession";
import { getIngredientSessionBySessionId } from "../../services/features/ingredientSessionSlice";
import PopupCheck from "../Popup/PopupCheck";

const columns: MRT_ColumnDef<ISession>[] = [
    {
        accessorKey: 'name',
        header: 'Tên phiên',
    },
    {
        accessorKey: 'status',
        header: 'Trạng thái',
        Cell: ({ cell }) => {
            const status = cell.row.original.status;
            return status === 1 ? (
                <span className="text-green-500 font-bold">Hoạt động</span>
            ) : (
                <span className="text-red-500 font-bold">Không Hoạt động</span>
            );
        },
    },
    {
        accessorKey: 'startTime',
        header: 'Bắt Đầu'
    },
    {
        accessorKey: 'endTime',
        header: 'Kết thúc'
    },
    {
        accessorKey: 'createdBy',
        header: 'Người tạo'
    },
    {
        accessorKey: 'created',
        header: 'Ngày tạo',
        Cell: ({ cell }) => {
            const created = cell.row.original.created;
            return typeof created === 'string'
                ? created.split('T')[0]
                : new Date(created).toISOString().split('T')[0];
        },
    },
    {
        accessorKey: 'lastModifiedBy',
        header: 'Người chỉnh sửa cuối'
    },
    {
        accessorKey: 'lastModified',
        header: 'Ngày chỉnh sửa cuối',
        Cell: ({ cell }) => {
            const lastModified = cell.row.original.lastModified;
            if (!lastModified) {
                return 'Chưa có thay đổi';
            }
            return typeof lastModified === 'string'
                ? lastModified.split('T')[0]
                : new Date(lastModified).toISOString().split('T')[0];
        },
    },
];

const SessionListComponent = () => {
    const dispatch = useAppDispatch();
    const { sessions } = useAppSelector((state) => state.sessions);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const [sessionData, setSessionData] = useState<ISession | null>(null);
    const [onPopupSessionDetail, setOnPopupSessionDetail] =
        useState<boolean>(false);
    const [onPopupCheckDeleteSession, setOnPopupCheckDeleteSession] =
        useState<boolean>(false);
    const [selectedSessionId, setSelectedSessionId] = useState<number | null>(null);

    useEffect(() => {
        if (!isPopupOpen) {
            dispatch(getAllSessions());
        }
    }, [isPopupOpen, dispatch]);

    const handlePopupOpen = () => {
        setIsPopupOpen(true);
    };

    const handlePopupClose = () => {
        setIsPopupOpen(false);
    };

    const handleShowSessionDetail = (session: ISession) => {
        setSessionData(session);
        dispatch(getIngredientSessionBySessionId({ sessionId: session?.id }));
        setOnPopupSessionDetail(true);
    };

    const handleOpenPopupDeleteSesstion = (id: number) => {
        setSelectedSessionId(id);
        setOnPopupCheckDeleteSession(true);
    };

    const handleDeleteSession = () => {
        if (selectedSessionId !== null) {
            dispatch(deleteSession({ id: selectedSessionId }))
                .unwrap()
                .then(() => {
                    setOnPopupSessionDetail(false);
                    setOnPopupCheckDeleteSession(false);
                    dispatch(getAllSessions());
                })
                .catch((error) => console.log(error));
        }
    };



    return (
        <Stack sx={{ m: '2rem 0' }}>
            <CommonTable
                columns={columns}
                data={sessions || []}
                onRowDoubleClick={handleShowSessionDetail}
                toolbarButtons={
                    <Button
                        variant="contained"
                        onClick={handlePopupOpen}
                        sx={{
                            color: 'black',
                            backgroundColor: 'orange',
                            '&:hover': {
                                backgroundColor: '#f58f1b',
                            },
                        }}
                    >
                        Thêm ca làm việc
                    </Button>
                }
            />
            <PopupCreateSession
                isPopupOpen={isPopupOpen}
                closePopup={handlePopupClose}
            />
            {sessionData && (
                <>
                    <PopupDetailSession
                        sessionId={sessionData?.id}
                        onPopupDetail={onPopupSessionDetail}
                        setOnPopupDetail={setOnPopupSessionDetail}
                        onDelete={() =>
                            handleOpenPopupDeleteSesstion(sessionData.id)
                        }
                        session={sessionData}
                    />

                </>
            )}
            <PopupCheck
                open={onPopupCheckDeleteSession}
                content="Bạn có chắc chắn muốn xoá ca này không?"
                titleAccept="Có"
                titleCancel="Không"
                onAccept={handleDeleteSession}
                onCancel={() => setOnPopupCheckDeleteSession(false)}
            />
        </Stack>
    )
}

export default SessionListComponent
