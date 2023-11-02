import React from "react";

import {CreditCardFormValues} from "../App.tsx";

export type CreditCardDisplayProps = {
    isSubmitting: boolean,
    formFields: CreditCardFormValues,
}
export const CreditCardDisplay:React.FC<CreditCardDisplayProps> = ({isSubmitting, formFields}) => {
    const firstNameDisplay = formFields.firstName || "";
    const lastNameDisplay = formFields.lastName || "";
    const creditCardNumberDisplay = formFields.creditCardNumber || "";
    const expirationDateDisplay = formFields.expirationDate || "";
    const cvvNumberDisplay = formFields.cvvNumber || "";

    return (
        <div className={`grid ${isSubmitting ? 'animate-bounce ease-out duration-300':'animate-none' }`}>
            <div className="z-20 mt-[20px] rounded-2xl h-[170px] w-[320px] sm:h-[200px] sm:w-[350px] bg-ccFront p-[10px] col-start-1 row-start-1">
                <div className="w-[45px] h-[30px] sm:w-[60px] sm:h-[40px] bg-ccLogo bg-cover"/>
                <div className="h-[120px] sm:h-[140px] flex flex-col">
                    <div className="ccTextShadow text-left text-2xl h-1/2 flex flex-col justify-end pb-2">{creditCardNumberDisplay}</div>
                    <div className="flex justify-between h-1/2 items-end">
                        <div className="ccTextShadow text-left">{`${firstNameDisplay} ${lastNameDisplay}`}</div>
                        <div className="ccTextShadow text-left">
                            <span className={formFields.expirationDate ? '' : 'hidden'}>Expires</span><br/>
                            {expirationDateDisplay}
                        </div>
                    </div>
                </div>
            </div>
            <div className="z-10 mt-[20px] rounded-2xl h-[170px] w-[320px] sm:h-[200px] sm:w-[350px] opacity-60 shadow-md shadow-black col-start-1 row-start-1"></div>
            <div className="z-0 ml-[50px] sm:ml-[80px] rounded-2xl h-[170px] w-[320px] sm:h-[200px] sm:w-[350px] bg-ccBack bg-cover p-[10px] shadow-sm col-start-1 row-start-1 flex flex-col justify-end">
                <div className="ccTextShadow text-right">
                    <span className={formFields.cvvNumber ? '' : 'hidden'}>CVV</span><br/>
                    {cvvNumberDisplay}
                </div>
            </div>
        </div>
    )
}

export default CreditCardDisplay;