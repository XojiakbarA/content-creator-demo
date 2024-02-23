import * as yup from "yup"

export const typographyValidationSchema = yup.object({
    content: yup
        .string('Enter Content')
        .required('Content is required')
})

export const alertValidationSchema = yup.object({
    content: yup
        .string('Enter Content')
        .required('Content is required')
})

export const listValidationSchema = yup.object({
    attributes: yup.object({
        items: yup.array().min(1, "items must have at least 1 items").of(
            yup.object({
                content: yup
                    .string('Enter Content')
                    .required('Content is required')
            })
        )
    })
})