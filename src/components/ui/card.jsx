import * as React from "react"

import { cn } from "@/lib/utils"

<<<<<<< HEAD
function Card({ className, ...props }) {
=======
function Card({
  className,
  ...props
}) {
>>>>>>> main
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      )}
<<<<<<< HEAD
      {...props}
    />
  )
}

function CardHeader({ className, ...props }) {
=======
      {...props} />
  );
}

function CardHeader({
  className,
  ...props
}) {
>>>>>>> main
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
<<<<<<< HEAD
      {...props}
    />
  )
}

function CardTitle({ className, ...props }) {
=======
      {...props} />
  );
}

function CardTitle({
  className,
  ...props
}) {
>>>>>>> main
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold", className)}
<<<<<<< HEAD
      {...props}
    />
  )
}

function CardDescription({ className, ...props }) {
=======
      {...props} />
  );
}

function CardDescription({
  className,
  ...props
}) {
>>>>>>> main
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
<<<<<<< HEAD
      {...props}
    />
  )
}

function CardAction({ className, ...props }) {
=======
      {...props} />
  );
}

function CardAction({
  className,
  ...props
}) {
>>>>>>> main
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
<<<<<<< HEAD
      {...props}
    />
  )
}

function CardContent({ className, ...props }) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }) {
=======
      {...props} />
  );
}

function CardContent({
  className,
  ...props
}) {
  return (<div data-slot="card-content" className={cn("px-6", className)} {...props} />);
}

function CardFooter({
  className,
  ...props
}) {
>>>>>>> main
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
<<<<<<< HEAD
      {...props}
    />
  )
=======
      {...props} />
  );
>>>>>>> main
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
