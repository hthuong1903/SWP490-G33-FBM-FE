import yup from "@/utils/yupValidation"

export const schemaOvertime = yup.object().shape({
  hour: yup.number().required('Vui lòng điền vào trường này.').typeError('Vui lòng nhập số'),
  content: yup.string().required('Vui lòng điền vào trường này.')

})
export const schemaTimeKeeping = yup.object().shape({
  date: yup.date().nullable().required('Vui lòng điền vào trường này.').typeError('Vui lòng nhập định dạng dd/MM/yyyy'),
})

