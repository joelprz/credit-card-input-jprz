# Joel Przybylowski _____ Insurance Coding Challenge

## Build/Run instructions 
1. Install dependencies (Node v18.8.0 required):
    - Run `npm i` in project root
    - Run `npm run dev`
   
2. Start project:
   - Run `npm run dev`
   - Navigate to `http://localhost:5173/` in your browser

## Discussion Topics for Design Team

Will the design allow for us to draw the background gradients programmatically?

If I'm not mistaken, credit card forms commonly ask for the user's full name and/or
specify it should match what appears on their physical credit card. Can you update the design to
accept a full name or at least include a middle initial?

Error messages are commonly red. Given the green/aqua theme I'm concerned errors
may not be visually prominent for red/green colorblind audiences.

Some of the fine print in the PDF is illegible at the provided resolution. Will need to confirm copy.

Assignment documentation mentions "(this is a mock API endpoint, documentation here)" but text is not linked.


## Technologies used

I created my project using React, Typescript, Tailwind, and Vite. These decisions
were largely made out of desire to finish as much as I could in the given amount
of time. Since I am already familiar with the tools (save for Vite) I could work quickly and confidently.
But it's worth pointing out that using React allows me to create easily testable components with (mostly) a single
responsibility that can be shared and reused. Typescript saves me hours of debugging and the inclusion of Zod
and React Hook Form makes validation simple, yet powerful.

## What did I complete?
Running on my local I can populate the form, observe validation and error messages, submit the form and view
some (crude!) processing animations, and view a "Success!" message and the return payload in the app UI when complete. As requested,
the form values are also visible on the stacked credit cards as the values are entered. It's responsive and should function at all
viewport widths.

Brand colors included in tailwind theme.

## What did I overlook/omit?
TESTS! I spent way more time on this than you all wanted (probably 8 hours?) and rather than rush to set up tests (I started, then stopped)
I chose to omit them. Rest assured, I've written thousands of them before! I can demonstrate that ability if need be.

Form resetting. If validation throws an error and the user then clears the field, the error message remains visible. I've dealt with this
before and can fix in the real world with time.

Validation strength. This is not rock-solid validation and can be improved. From a UX perspective I would consider
preventing the user from entering, for example, a non-numeric character rather than have validation inform them.
I would also add text formatting to something like the CC number and expiration date using a pattern formatting tool.

Code formatting. I think it looks ok but am used to something like prettier keeping everything spaced an aligned.
