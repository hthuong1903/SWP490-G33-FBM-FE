import yup from "@/utils/yupValidation"

export const schemaSubsidize = yup.object().shape({
  subsidize: yup.string().required('Vui lòng điền vào trường này.'),

})
export const schemaBonus = yup.object().shape({
  bonus: yup.string().required('Vui lòng điền vào trường này.'),
})

