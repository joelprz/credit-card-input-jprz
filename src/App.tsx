import {useForm, SubmitHandler} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {useState} from "react";

import InfoButton from "./components/InfoButton.tsx";
import CreditCardDisplay from "./components/CreditCardDisplay.tsx";
import FormInputError from "./components/FormInputError.tsx";

// TODO Don't display errors for submitted fields when values are blank. Reset validation.
export const creditCardSchema = z.object({
    creditCardNumber: z
        .string({required_error: "Cannot be blank"}).refine(val => {
            // TODO Find a way to avoid repeating logic in these functions
            let hasMatchingEnds = false;

            const isAllInts = val.match(/^[0-9]+$/) != null;
            const isCorrectLength = val.length === 15 || val.length === 16;

            if (isCorrectLength) {
                if (val[0] === val[val.length - 1]) {
                    hasMatchingEnds = true;
                }
            }

            return isCorrectLength && hasMatchingEnds && isAllInts;
        }, (val) => {
            const isAllInts = val.match(/^[0-9]+$/) != null;
            const isCorrectLength = val.length === 15 || val.length === 16;

            let errorMessage = isCorrectLength ? "First and last must match" : "Length must be 15 or 16";

            if (!isAllInts) {
                if (val.length) {
                    errorMessage = "Contains non-numeric character";
                }
            }

            return ({message: errorMessage});
        } ),
    firstName: z
        .string({required_error: "Cannot be blank"})
        .min(1, "Cannot be blank"),
    lastName: z
        .string({required_error: "Cannot be blank"})
        .min(1, "Cannot be blank"),
    zipCode: z
        .string({required_error: "Zip code cannot be blank"})
        .length(5, "Length must be 5 or 9").or(z.string().length(9, "Length must be 5 or 9")),
    expirationDate: z
        .string({required_error: "Date cannot be blank"})
        .min(5, {message: "Must be 5 chars"}),
    cvvNumber: z
        .string({required_error: "CVV cannot be blank"})
        .min(3, {message: "Must be at least 3 digits"})
        .max(4,  {message: "Must not exceed 4 digits"}),
})

export type CreditCardFormValues = {
    creditCardNumber: string,
    firstName: string,
    lastName: string,
    zipCode: string,
    expirationDate: string,
    cvvNumber: string,
}
function App() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors},
    } = useForm<CreditCardFormValues>({
        resolver: zodResolver(creditCardSchema)
    })

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
    const [responseId, setResponseId] = useState(undefined);

    const onSubmit: SubmitHandler<CreditCardFormValues> = async (data) => {
        setIsSubmitting(true);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };

        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts', requestOptions);
            const responseData = await response.json();

            setTimeout(() => {
                setIsSubmitting(false);
                setIsSubmitSuccess(true);
                setResponseId(responseData.id);
            }, 4000)
        } catch (e) {
            // Display an error message and offer a retry
            console.log(e);
        }
    }
    const formFields = watch();

    return (
    <main className="max-w-none px-2 sm:px-6 lg:px-20 pt-6">
        <h2 className="text-black text-left text-3xl mb-14">Pay with credit card</h2>
        <div className={`${isSubmitting ? 'mb-10' : 'mb-20'}`}>
            {
                isSubmitSuccess ? (<div className="text-2xl text-blue-600 font-extrabold">Payment Received! <br/> {`Your order ID is: ${responseId}`} </div>) : (<CreditCardDisplay formFields={formFields} isSubmitting={isSubmitting}/>)
            }

            {isSubmitting &&
                <div className="animate-pulse">Submitting payment...</div>
            }
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={`${isSubmitSuccess ? 'invisible' : 'block'}`}>
            <div className="max-w-xl mb-4">
                <div className="grid grid-cols-1 md:grid-cols-[230px_1fr] gap-x-4 gap-y-4 mb-8">
                    <div className="text-left">
                        <label className="block text-sm font-bold text-green" htmlFor={"creditCardNumber"}>
                            Credit Card Number <InfoButton/>
                        </label>
                        <input id="creditCardNumber" type="text" className="block w-full py-1 px-0 text-grey border-t-0 border-x-0 focus:ring-0 border-b-2 border-b-green focus:border-b-green" {...register("creditCardNumber", { required: true })} />
                        <FormInputError message={errors.creditCardNumber?.message}/>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                        <div className="text-left">
                            <label className="block text-sm font-bold text-green" htmlFor={"creditCardNumber"}>
                                Expiration Date
                            </label>
                            <input id="expirationDate" type="text" placeholder="MM/YY" className="block w-full py-1 px-0 text-grey border-t-0 border-x-0 focus:ring-0 border-b-2 border-b-green focus:border-b-green placeholder-grey placeholder-opacity-50" {...register("expirationDate", { required: true })} />
                            <FormInputError message={errors.expirationDate?.message}/>
                        </div>
                        <div className="text-left">
                            <label className="block text-sm font-bold text-green" htmlFor={"creditCardNumber"}>
                                CVV <InfoButton/>
                            </label>
                            <input id="cvvNumber" type="text" className="block w-full py-1 px-0 text-grey border-t-0 border-x-0 focus:ring-0 border-b-2 border-b-green focus:border-b-green" {...register("cvvNumber", { required: true })} />
                            <FormInputError message={errors.cvvNumber?.message}/>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-4 mt-4">
                    <div className="text-left">
                        <label className="block text-sm font-bold text-green" htmlFor={"firstName"}>
                            Cardholder's First Name
                        </label>
                        <input id="firstName" type="text" className="block w-full py-1 px-0 text-grey border-t-0 border-x-0 focus:ring-0 border-b-2 border-b-green focus:border-b-green" {...register("firstName", { required: true })} />
                        <FormInputError message={errors.firstName?.message}/>
                    </div>
                    <div className="text-left">
                        <label className="block text-sm font-bold text-green" htmlFor={"lastName"}>
                            Cardholder's Last Name
                        </label>
                        <input id="lastName" type="text" className="block w-full py-1 px-0 text-grey border-t-0 border-x-0 focus:ring-0 border-b-2 border-b-green focus:border-b-green" {...register("lastName", { required: true })} />
                        <FormInputError message={errors.lastName?.message}/>
                    </div>
                    <div className="text-left">
                        <label className="block text-sm font-bold text-green" htmlFor={"lastName"}>
                            Billing Zip Code
                        </label>
                        <input id="lastName" type="text" className="block w-full py-1 px-0 text-grey border-t-0 border-x-0 focus:ring-0 border-b-2 border-b-green focus:border-b-green" {...register("zipCode", { required: true })} />
                        <FormInputError message={errors.zipCode?.message}/>
                    </div>
                </div>
            </div>
            <div className="h-auto flex flex-col items-start">
                <button className="bg-teal text-white hover:bg-white hover:text-teal border-teal hover:border-teal" type="submit">Submit</button>
            </div>
        </form>
    </main>
  )
}

export default App
