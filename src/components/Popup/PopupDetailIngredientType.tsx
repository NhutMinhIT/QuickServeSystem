import { XMarkIcon } from "@heroicons/react/16/solid";
import { IIngredientType } from "../../models/Ingredient";

type PopupIngredientTypeDetailProps = {
    ingredientType: IIngredientType | null;
    onPopupDetail: boolean;
    setOnPopupDetail: React.Dispatch<React.SetStateAction<boolean>>;
    onChangeStatus: () => void;
    onDelete: () => void;
    onRename: () => void;
}
const PopupDetailIngredientType: React.FC<PopupIngredientTypeDetailProps> = ({
    ingredientType,
    onPopupDetail,
    setOnPopupDetail,
    onChangeStatus,
    onDelete,
    onRename,
}) => {
    return (
        <div
            className={`fixed z-10 inset-0 overflow-y-auto ${onPopupDetail ? '' : 'hidden'
                }`}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div
                    className="fixed inset-0 bg-gray-800 bg-opacity-90 transition-opacity"
                    aria-hidden="true"
                ></div>
                <span
                    className="hidden sm:inline-block sm:align-middle sm:h-screen"
                    aria-hidden="true"
                >
                    &#8203;
                </span>
                <div className="bg-white-700 inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full pb-2">
                                <div className="flex">
                                    <h3
                                        className="text-lg leading-6 w-full font-medium text-gray-900"
                                        id="modal-title"
                                    >
                                        Thông tin chi tiết
                                    </h3>
                                    <XMarkIcon
                                        width={16}
                                        height={16}
                                        className="h-6 w-6 ml-auto cursor-pointer"
                                        onClick={() => setOnPopupDetail(false)}
                                    />
                                    <hr className="mt-2 text-black-700" />
                                </div>
                                <div className="mt-4 border-t grid grid-cols-2 gap-4 p-8">
                                    <div>
                                        <span className="text-sm text-back-500 font-bold">
                                            Tên
                                        </span>
                                    </div>
                                    <div>
                                        <span>{ingredientType?.name}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-back-500 font-bold divide-y divide-blue-500">
                                            Trạng thái
                                        </span>
                                    </div>
                                    <div>
                                        <span
                                            style={{
                                                color:
                                                    ingredientType?.status === 1
                                                        ? 'green'
                                                        : 'red',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {ingredientType?.status === 1
                                                ? 'Hoạt động'
                                                : 'Không hoạt động'}
                                        </span>
                                    </div>

                                    <div>
                                        <span className="text-sm text-back-500 font-bold">
                                            Người tạo
                                        </span>
                                    </div>
                                    <div>
                                        <span>{ingredientType?.createdBy}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-back-500 font-bold">
                                            Ngày tạo
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            {typeof ingredientType?.created === 'string'
                                                ? new Date(
                                                    ingredientType.created,
                                                ).toLocaleDateString('vi-VN')
                                                : ingredientType?.created.toLocaleDateString(
                                                    'vi-VN',
                                                )}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-back-500 font-bold">
                                            Người chỉnh sửa
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            {ingredientType?.lastModifiedBy ??
                                                'Chưa có thay đổi'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-back-500 font-bold">
                                            Ngày chỉnh sửa
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            {ingredientType?.lastModified &&
                                                ingredientType.lastModified !== ''
                                                ? typeof ingredientType.lastModified ===
                                                    'string'
                                                    ? new Date(
                                                        ingredientType.lastModified,
                                                    ).toLocaleDateString(
                                                        'vi-VN',
                                                    )
                                                    : ingredientType?.lastModified.toLocaleDateString(
                                                        'vi-VN',
                                                    )
                                                : 'Chưa có thay đổi'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-back-500 font-bold">
                                            Hành động
                                        </span>
                                    </div>
                                    <div className="w-auto flex gap-4">
                                        {ingredientType?.status === 1 ? (
                                            <button
                                                onClick={onChangeStatus}
                                                className="text-xs w-auto border border-red-500 px-2 py-1 bg-orange-500 text-white-900 font-bold rounded-lg"
                                            >
                                                Ngưng hoạt động
                                            </button>
                                        ) : (
                                            <button
                                                onClick={onChangeStatus}
                                                className="border border-green-500 p-1 bg-green-500 text-white-900 font-bold rounded-lg"
                                            >
                                                Hoạt động
                                            </button>
                                        )}
                                        <button
                                            onClick={onDelete}
                                            className="text-xs w-24 border border-red-500 p-1 bg-red-500 text-white-900 font-bold rounded-lg"
                                        >
                                            Xoá
                                        </button>
                                        <button
                                            onClick={onRename}
                                            className="text-xs w-24 border border-yellow-500 p-1 bg-yellow-500 text-white-900 font-bold rounded-lg"
                                        >
                                            Sửa tên
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PopupDetailIngredientType
