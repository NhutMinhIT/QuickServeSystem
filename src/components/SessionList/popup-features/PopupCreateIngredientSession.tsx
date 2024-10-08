import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { useAppDispatch, useAppSelector } from "../../../services/store/store";
import { createIngredientSession, getIngredientSessionBySessionId } from "../../../services/features/ingredientSessionSlice";
import { schemaCreateIngredientSession } from "../../../schemas/schemaCreateIngredientSession";
import { Grid } from "@mui/material";
import Select from 'react-select';

type PopupCreateIngredientSessionProps = {
    sessionId: number;
    isPopupOpen: boolean;
    closePopup: () => void;
};

type FormCreateIngredientSessionStepValues = {
    sessionId: number;
    ingredients: {
        id: number;
        quantity: number;
    }[];
};
type IngredientOption = {
    value: number;
    label: string;
};


const PopupCreateIngredientSession = ({
    sessionId,
    isPopupOpen,
    closePopup,
}: PopupCreateIngredientSessionProps) => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const ingredientsActive = useAppSelector((state) => state.ingredients.ingredientsActive);

    const {
        register,
        handleSubmit,
        control,
        reset,
    } = useForm<FormCreateIngredientSessionStepValues>({
        resolver: yupResolver(schemaCreateIngredientSession),
        defaultValues: {
            ingredients: [{ id: 0, quantity: 0 }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "ingredients",
    });

    const onSubmit = (data: FormCreateIngredientSessionStepValues) => {
        setIsLoading(true);
        dispatch(createIngredientSession(data))
            .unwrap()
            .then(() => {
                dispatch(getIngredientSessionBySessionId({ sessionId: sessionId }));
                closePopup();
            })
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false));
        reset();
    };

    return (
        isPopupOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                <div className="relative p-6 bg-white-500 border rounded-lg shadow-lg w-full max-w-4xl">
                    <button
                        onClick={closePopup}
                        className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                    >
                        <XMarkIcon width={24} height={24} />
                    </button>
                    <div className="text-center">
                        <h2 className="text-xl font-bold mb-4">Tạo nguyên liệu cho ca</h2>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input
                                type="hidden"
                                {...register("sessionId")}
                                value={sessionId}
                            />
                            <div className="mb-4">
                                <Grid container rowSpacing={2} columnSpacing={2}>
                                    <Grid item md={9} xs={9} xl={9} lg={9}>
                                        <label
                                            htmlFor="id"
                                            className="block w-full px-3 py-2 sm:text-sm"
                                        >
                                            Nguyên Liệu
                                        </label>
                                    </Grid>
                                    <Grid item md={2} xs={2} xl={2} lg={2}>
                                        <label
                                            htmlFor="quantity"
                                            className="block w-full px-3 py-2 sm:text-sm"
                                        >
                                            Số lượng
                                        </label>
                                    </Grid>
                                    <Grid item md={1} xs={1} xl={1} lg={1} />
                                </Grid>
                                <div className="overflow-y-auto h-80">
                                    <Grid container>
                                        {fields.map((field, index) => (
                                            <Grid container key={field.id} rowSpacing={2} columnSpacing={2} sx={{ marginBottom: 2 }}>
                                                <Grid item md={9} xs={9} xl={9} lg={9} rowSpacing={2} columnSpacing={2}>
                                                    <Controller
                                                        name={`ingredients.${index}.id`}
                                                        control={control}
                                                        render={({ field }) => (
                                                            <Select
                                                                {...field}
                                                                options={ingredientsActive?.map((ingredient) => ({
                                                                    value: ingredient.id,
                                                                    label: ingredient.name,
                                                                })) as IngredientOption[]}
                                                                onChange={(newValue) => {
                                                                    field.onChange(newValue?.value);
                                                                }}
                                                                value={
                                                                    ingredientsActive?.find((ingredient) => ingredient.id === field.value)
                                                                        ? {
                                                                            value: field.value,
                                                                            label: ingredientsActive.find(
                                                                                (ingredient) => ingredient.id === field.value
                                                                            )?.name,
                                                                        }
                                                                        : null
                                                                }
                                                            />
                                                        )}
                                                    />
                                                </Grid>
                                                <Grid item md={2} xs={2} xl={2} lg={2} rowSpacing={2} columnSpacing={2}>
                                                    <input
                                                        {...register(`ingredients.${index}.quantity`)}
                                                        type="number"
                                                        min={1}
                                                        placeholder="Min"
                                                        className="w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                                    />
                                                </Grid>
                                                {fields.length === 1 ? '' : (
                                                    <Grid item md={1} xs={1} xl={1} lg={1} alignSelf="center">
                                                        <button
                                                            type="button"
                                                            onClick={() => remove(index)}
                                                            className="text-red-500 hover:text-red-700"
                                                        >
                                                            <XMarkIcon width={24} height={24} />
                                                        </button>
                                                    </Grid>
                                                )}
                                            </Grid>
                                        ))}
                                    </Grid>
                                </div>
                            </div>
                            <div className="flex justify-between mt-4">
                                <button
                                    type="button"
                                    onClick={() => append({ id: 0, quantity: 0 })}
                                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                                >
                                    Thêm Nguyên Liệu
                                </button>
                                <button
                                    type="submit"
                                    className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
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
                                        "Tạo nguyên liệu cho ca"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
};

export default PopupCreateIngredientSession;
