import { XMarkIcon } from "@heroicons/react/16/solid";
import { IIngredient } from "../../models/Ingredient";
import { formatAnyDate } from "../../utils";
import { useState } from "react";
import { useAppDispatch } from "../../services/store/store";
import { getNutritionByIngredientId } from "../../services/features/ingredientNutritionSlice";
import PopupGetAllNutritionIngredientId from "../Ingredients/Popup/PopupGetAllNutritionIngredientId";

type PopupDetailIngredientProps = {
    ingredient: IIngredient | null;
    onPopupIngredientDetail: boolean;
    setOnPopupIngredientDetail: React.Dispatch<React.SetStateAction<boolean>>
    onDelete: () => void;
    onChangeImage: () => void;
    onUpdate: () => void;
}

const PopupDetailIngredient: React.FC<PopupDetailIngredientProps> = ({
    ingredient,
    onPopupIngredientDetail,
    setOnPopupIngredientDetail,
    onDelete,
    onChangeImage,
    onUpdate
}) => {
    const dispatch = useAppDispatch();
    const [onPopupNutrition, setOnPopupNutrition] = useState(false);
    const [ingredientId, setIngredientId] = useState<number>(0);

    const handleOpenAllNutrition = (id: number) => {
        setOnPopupNutrition(true);
        setIngredientId(id);
        dispatch(getNutritionByIngredientId({ ingredientId: id }));
    }
    const handleCloseAllNutrition = () => {
        setOnPopupNutrition(false);
    }

    return (
        <div
            className={`fixed z-10 inset-0 overflow-y-auto  ${onPopupIngredientDetail ? '' : 'hidden'
                }`}
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
        >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
                <div className="min-w-[900px] bg-white inline-block align-bottom bg-white rounded-lg text-left shadow-xl transform transition-all sm:align-middle sm:max-w-2xl sm:w-full max-h-[80vh]  overflow-y-auto bg-white-500 ">
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
                                        onClick={() => setOnPopupIngredientDetail(false)}
                                    />
                                    <hr className="mt-2 text-black-700" />
                                </div>
                                <div className="mt-4 border-t grid grid-cols-2 gap-4 p-4">
                                    <div>
                                        <span className="text-sm text-black-500 font-bold">
                                            Tên nguyên liệu
                                        </span>
                                    </div>
                                    <div>
                                        <span>{ingredient?.name}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-black-500 font-bold">
                                            Loại nguyên liệu
                                        </span>
                                    </div>
                                    <div>
                                        <span>{ingredient?.ingredientType?.name}</span>
                                    </div>
                                    {/* Default Quantity */}
                                    <div>
                                        <span className="text-sm text-black-500 font-bold">
                                            Số lượng mặc định
                                        </span>
                                    </div>
                                    <div>
                                        <span>{ingredient?.defaultQuantity}</span>
                                    </div>
                                    {/* Quantity Max */}
                                    <div>
                                        <span className="text-sm text-black-500 font-bold">
                                            Số lượng tối đa
                                        </span>
                                    </div>
                                    <div>
                                        <span>{ingredient?.quantityMax}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-black-500 font-bold">
                                            Mẫu ảnh
                                        </span>
                                    </div>
                                    <div>
                                        <img
                                            src={`${ingredient?.imageUrl}?t=${new Date().getTime()}`}
                                            alt="Simple image"
                                            className="w-24 h-24 object-cover"
                                        />
                                    </div>
                                    <div>
                                        <span className="text-sm text-black-500 font-bold divide-y divide-blue-500">
                                            Trạng thái
                                        </span>
                                    </div>
                                    <div>
                                        <span
                                            style={{
                                                color:
                                                    ingredient?.status === 1
                                                        ? 'green'
                                                        : 'red',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {ingredient?.status === 1
                                                ? 'Hoạt động'
                                                : 'Không hoạt động'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-black-500 font-bold">
                                            Hàm lượng Calo
                                        </span>
                                    </div>
                                    <div>
                                        <span>{ingredient?.calo}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-black-500 font-bold">
                                            Dinh Dưỡng
                                        </span>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleOpenAllNutrition(ingredient?.id as number)}
                                            className="text-xs w-24 border border-yellow-500 p-1 bg-yellow-500 text-white-500 font-bold rounded-lg"
                                        >
                                            Xem chi tiết
                                        </button>
                                    </div>
                                    <div>
                                        <span className="text-sm text-black-500 font-bold">
                                            Mô tả
                                        </span>
                                    </div>
                                    <div>
                                        <span>{ingredient?.description}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-black-500 font-bold">
                                            Người tạo
                                        </span>
                                    </div>
                                    <div>
                                        <span>{ingredient?.createdBy}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-black-500 font-bold">
                                            Ngày tạo
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            {formatAnyDate(ingredient?.created ? new Date(ingredient.created) : undefined)}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-black-500 font-bold">
                                            Người chỉnh sửa
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            {ingredient?.lastModifiedBy ??
                                                'Chưa có thay đổi'}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-black-500 font-bold">
                                            Ngày chỉnh sửa
                                        </span>
                                    </div>
                                    <div>
                                        <span>
                                            <span>
                                                {ingredient?.lastModified !== null
                                                    ? (formatAnyDate(ingredient?.lastModified ? new Date(ingredient.lastModified) : undefined))
                                                    : 'Chưa có thay đổi'
                                                }
                                            </span>
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-black-500 font-bold">
                                            Hành động
                                        </span>
                                    </div>
                                    <div className="w-auto flex gap-4">
                                        <button
                                            onClick={onChangeImage}
                                            className="text-xs w-auto border border-red-500 px-2 py-1 bg-orange-500 text-white-500 font-bold rounded-lg"
                                        >
                                            Thay đổi ảnh mẫu
                                        </button>

                                        <button
                                            onClick={onDelete}
                                            className="text-xs w-24 border border-red-500 p-1 bg-red-500 text-white-500 font-bold rounded-lg"
                                        >
                                            Xoá
                                        </button>
                                        <button
                                            onClick={onUpdate}
                                            className="text-xs w-24 border border-yellow-500 p-1 bg-yellow-500 text-white-500 font-bold rounded-lg"
                                        >
                                            Sửa thông tin
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PopupGetAllNutritionIngredientId
                openPopupNutrition={onPopupNutrition}
                ingredientId={ingredientId}
                handleCloseAllNutrition={handleCloseAllNutrition}
            />
        </div>
    );
}

export default PopupDetailIngredient;
