import { useForm, Controller } from 'react-hook-form';

import { myHistory } from '../../utils/router/history';
import { useSearchParamValues } from '../../hooks/useParamValues';
import { categories, countries, languages, sorts } from '../../constants/index'
import Input from "../input/Input"
import ComboBoxDefaultWrapper from '../input/ComboBox';
import Button from '../input/Button';

const FilterForm = () => {
  const params = useSearchParamValues()

  const createQueryString = (data = {}) => {
    const params = new URLSearchParams();
    if (data.q) {
      Object.entries(data).forEach(([key, value]) => {
        params.append(key, value?.id || value)
      });
    }
    return params.toString();
  };


  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      dateFrom: params.dateFrom || '',
      dateTo: params.dateTo || '',
      country: params.country || { id: 'us', label: "USA", value: "us" },
      category: params.category || { id: 'general', label: "General", value: "general" },
      language: params.language || { id: 'en', label: "English", value: "en" },
      sortBy: params.sortBy || { id: 'relevancy', label: "Relevancy", value: "relevancy" },
      q: params.q
    }
  })

  const onSubmit = (data) => {
    if (data.q) {
      myHistory.replace(`/search-results?${createQueryString(data)}`);
    }

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
      <div className=" border-t-gray-300 border border-white ">
        <h3 className="text-md font-medium leading-tight pt-4 mb-4">Sort By</h3>
        <Controller
          name="sortBy"
          control={control}
          rules={{
            required: "Please select a Language",
          }}
          render={({ field: { onChange, value, onBlur } }) => (
            <ComboBoxDefaultWrapper
              label="Combo Box"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              options={sorts}
              error={errors.country}
            />
          )}
        />
      </div>
      <div className=" border-t-gray-300 border border-white ">
        <h3 className="text-md font-medium leading-tight pt-4 mb-4">
          Date Range:
        </h3>
        <Input
          id={"dateFrom"}
          label={"From:"}
          type={"date"}
          register={register}
          errors={errors}
        />
        <div className='pt-4'></div>
        <Input
          id={"dateTo"}
          label={"To:"}
          type={"date"}
          register={register}
          errors={errors}
        />
      </div>
      <div className=" border-t-gray-300 border border-white ">
        <h3 className="text-md font-medium leading-tight pt-4 mb-4">Categories</h3>
        <Controller
          name="category"
          control={control}
          rules={{
            required: "Please select a category",
          }}
          render={({ field: { onChange, value, onBlur } }) => (
            <ComboBoxDefaultWrapper
              label="Combo Box"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              options={categories}
              error={errors.country}
            />
          )}
        />
      </div>
      <div className=" border-t-gray-300 border border-white ">
        <h3 className="text-md font-medium leading-tight pt-4 mb-4">Country</h3>
        <Controller
          name="country"
          control={control}
          rules={{
            required: "Please select a country",
          }}
          render={({ field: { onChange, value, onBlur } }) => (
            <ComboBoxDefaultWrapper
              label="Combo Box"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              options={countries}
              error={errors.country}
            />
          )}
        />
      </div>
      <div className=" border-t-gray-300 border border-white ">
        <h3 className="text-md font-medium leading-tight pt-4 mb-4">Language</h3>
        <Controller
          name="language"
          control={control}
          rules={{
            required: "Please select a Language",
          }}
          render={({ field: { onChange, value, onBlur } }) => (
            <ComboBoxDefaultWrapper
              label="Combo Box"
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              options={languages}
              error={errors.country}
            />
          )}
        />
      </div>
      <div className='flex gap-4'>
        <Button danger={true} onClick={() => reset()}>Reset</Button>
        <Button type='submit' >Apply</Button>
      </div>

    </form>
  )
}

export default FilterForm;
