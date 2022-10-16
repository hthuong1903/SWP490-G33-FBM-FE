import yup from "@/utils/yupValidation"

export const schemaOvertime = yup.object().shape({
  hour: yup.string().required('Vui lòng điền vào trường này.'),

})
export const schemaTimeKeeping = yup.object().shape({
  date: yup.string().required('Vui lòng điền vào trường này.'),

})

