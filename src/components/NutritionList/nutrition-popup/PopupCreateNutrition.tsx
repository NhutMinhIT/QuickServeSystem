import { useState } from "react";
import { Resolver, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaCreateNutrition } from "../../../schemas/schemaNutrition";
import { createNutrition, getAllNutritions } from "../../../services/features/nutritionSlice";
import { useAppDispatch } from "../../../services/store/store";
import { XMarkIcon } from "@heroicons/react/16/solid";
import './style/style.css'

type PopupCreateNutritionProps = {
    isOpen: boolean;
    closePopup: () => void;
};

type FormCreateNutritionValues = {
    name: string;
    description: string;
    image: FileList;
    vitamin: string;
    healthValue: string;
};

const PopupCreateNutrition: React.FC<PopupCreateNutritionProps> = ({
    isOpen,
    closePopup
}) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<FormCreateNutritionValues>({
        resolver: yupResolver(schemaCreateNutrition) as unknown as Resolver<FormCreateNutritionValues>,
    });

    const onSubmit = (data: FormCreateNutritionValues) => {
        setIsLoading(true);
        const formData = new FormData();

        formData.append('name', data.name);
        formData.append('description', data.description);
        if (data.image && data.image.length > 0) {
            formData.append('image', data.image[0]);
        }
        formData.append('vitamin', data.vitamin);
        formData.append('healthValue', data.healthValue);

        dispatch(createNutrition(formData))
            .then(() => {
                dispatch(getAllNutritions());
                setIsLoading(false);
                closePopup();
                reset();
            })
            .catch((error: any) => {
                console.error('Create nutrition error:', error);
            })
            .finally(() => setIsLoading(false));
    };

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                <div className="px-2 relative bg-white border rounded-lg shadow-lg bg-white-400 overflow-y-scroll lg:h-[500px] lg:w-[500px] w-auto h-auto">
                    <button
                        onClick={closePopup}
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    >
                        <XMarkIcon width={24} height={24} />
                    </button>
                    <div className="text-center">
                        <h2 className="text-xl font-bold mb-4 mt-2">Tạo thông tin dinh dưỡng</h2>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="p-2">
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Tên dinh dưỡng</label>
                            <input
                                {...register('name')}
                                type="text"
                                name="name"
                                placeholder="Tinh bột"
                                required
                                id="name"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            />
                            {errors.name && <p className='text-red-500 text-xs mt-2'>* {errors.name.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="vitamin" className="block text-sm font-medium text-gray-700">Vitamin</label>
                            <input
                                {...register('vitamin')}
                                type="text"
                                name="vitamin"
                                placeholder="B3 B6 B12..."
                                required
                                id="vitamin"
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            />
                            {errors.vitamin && <p className='text-red-500 text-xs mt-2'>* {errors.vitamin.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Mô tả</label>
                            <textarea
                                {...register('description')}
                                name="description"
                                id="description"
                                required
                                placeholder="Cung cấp năng lượng cho con người....."
                                className="textArea mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            />
                            {errors.description && <p className='text-red-500 text-xs mt-2'>* {errors.description.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Hình ảnh</label>
                            <input
                                {...register('image')}
                                type="file"
                                name="image"
                                id="image"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            />
                            {errors.image && <p className='text-red-500 text-xs mt-2'>* {errors.image.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="healthValue" className="block text-sm font-medium text-gray-700">Giá trị dinh dưỡng</label>
                            <textarea
                                {...register('healthValue')}
                                name="healthValue"
                                id="healthValue"
                                required
                                placeholder="Tinh bột có công dụng ...."
                                className="textArea mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            />
                            {errors.healthValue && <p className='text-red-500 text-xs mt-2'>* {errors.healthValue.message}</p>}
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                ) : (
                                    'Tạo dinh dưỡng'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default PopupCreateNutrition;
