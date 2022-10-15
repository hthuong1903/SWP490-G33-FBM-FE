import yup from '@/utils/yupValidation'

const schema = yup.object().shape({
  name: yup.string().required('Vui lòng điền vào trường này.'),
  category: yup.string().required('Vui lòng điền vào trường này.'),
  supplier: yup.string().required('Vui lòng điền vào trường này.'),
  quantity: yup
    .number()
    .required('Vui lòng điền vào trường này.')
    .typeError('Vui lòng điền vào trường này.')
    .min(1, 'Vui lòng nhập lớn hơn 0'),
  description: yup.string().required('Vui lòng điền vào trường này.'),
  importPrice: yup
    .number()
    .required('Vui lòng điền vào trường này.')
    .min(1000, 'Vui lòng nhập giá trị lớn hơn 1000')
    .typeError('Vui lòng nhập giá trị lớn hơn 1000')
    .max(100000000, 'Giá trị không hợp lệ'),
  price: yup
    .number()
    .required('Vui lòng điền vào trường này.')
    .min(1000, 'Vui lòng nhập giá trị lớn hơn 1000')
    .typeError('Vui lòng nhập giá trị lớn hơn 1000')
    .max(100000000, 'Giá trị không hợp lệ'),
  color: yup.string().required('Không bỏ trống'),
  material: yup.string().required('Không bỏ trống'),
  width: yup
    .number()
    .required('Không bỏ trống')
    .typeError('Không bỏ trống')
    .min(1, 'Vui lòng nhập lớn hơn 0'),
  length: yup
    .number()
    .required('Không bỏ trống')
    .typeError('Không bỏ trống')
    .min(1, 'Vui lòng nhập lớn hơn 0'),
  height: yup
    .number()
    .required('Không bỏ trống')
    .typeError('Không bỏ trống')
    .min(1, 'Vui lòng nhập lớn hơn 0')
})
export default schema
