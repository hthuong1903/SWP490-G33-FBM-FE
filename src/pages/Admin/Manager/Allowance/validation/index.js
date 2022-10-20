import yup from '@/utils/yupValidation'

const schema = yup.object().shape({
  name: yup.string().required('Vui lòng điền vào trường này.'),
  money: yup
    .number()
    .required('Vui lòng điền vào trường này.')
    .typeError('Vui lòng điền vào trường này.')
    .min(1, 'Vui lòng nhập lớn hơn 0').max(100000000, 'Giá trị không hợp lệ'),
  description: yup.string().required('Vui lòng điền vào trường này.'),

})
export default schema
