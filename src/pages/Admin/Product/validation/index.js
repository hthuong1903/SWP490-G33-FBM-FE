import yup from '@/utils/yupValidation'

const schema = yup.object().shape({
  name: yup.string().required('Vui lòng điền vào trường này.').trim(),
  // category: yup.string().required('Vui lòng điền vào trường này.'),
  // supplier: yup.string().required('Vui lòng điền vào trường này.'),
  quantity: yup
    .number()
    .required('Vui lòng điền vào trường này.')
    .typeError('Vui lòng điền vào trường này.')
    .min(1, 'Vui lòng nhập lớn hơn 0'),
  description: yup.string().required('Vui lòng điền vào trường này.').trim(),
  priceIn: yup
    .number()
    .required('Vui lòng điền vào trường này.')
    .min(1000, 'Vui lòng nhập giá trị lớn hơn 1000')
    .typeError('Vui lòng nhập giá trị lớn hơn 1000')
    .max(100000000, 'Giá trị không hợp lệ'),
  priceOut: yup
    .number()
    .required('Vui lòng điền vào trường này.')
    .min(1000, 'Vui lòng nhập giá trị lớn hơn 1000')
    .typeError('Vui lòng nhập giá trị lớn hơn 1000')
    .max(100000000, 'Giá trị không hợp lệ'),
  color: yup.string().required('Không bỏ trống').trim(),
  material: yup.string().required('Không bỏ trống').trim(),
  size: yup.string().required('Vui lòng không bỏ trống trường này.').trim()
})
export default schema
