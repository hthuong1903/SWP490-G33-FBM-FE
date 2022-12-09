import yup from "@/utils/yupValidation"

export const schemaOvertime = yup.object().shape({
  hour: yup.number().required('Vui lòng điền vào trường này.').typeError('Vui lòng nhập số'),
  content: yup.string().required('Vui lòng điền vào trường này.'),
  hour: yup
    .number()
    .required('Vui lòng điền vào trường này.')
    .min(0, 'Vui lòng nhập giá trị lớn hơn 0')
    .typeError('Vui lòng nhập giá trị lớn hơn 0')
    .max(8, 'Giá trị không hợp lệ'),
})
export const schemaTimeKeeping = yup.object().shape({
  date: yup.date().nullable().required('Vui lòng điền vào trường này.').typeError('Vui lòng nhập định dạng dd/MM/yyyy'),
})

