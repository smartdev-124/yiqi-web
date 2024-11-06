'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { TriangleAlert } from 'lucide-react'

import { useRouter } from 'next/navigation'
import { deleteUserAccount } from '@/services/actions/userActions'

export default function DeleteAccountDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      const result = await deleteUserAccount()
      if (result.success) {
        toast({
          title: 'Account Deleted',
          description:
            'Your account has been successfully deleted. You have been logged out.'
        })
        router.push('/auth')
      } else {
        toast({
          title: 'ERROR:',
          description: result.error ?? 'Failed to delete account',
          variant: 'destructive'
        })
      }
    } catch (error) {
      console.log(error)
      toast({
        title: 'ERROR:',
        description: 'Something went wrong',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
      setIsOpen(false)
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="flex items-center space-x-2">
          <TriangleAlert className="h-4 w-4" />
          <span>Delete Account</span>
        </Button>
      </AlertDialogTrigger>
      <AnimatePresence>
        {isOpen && (
          <AlertDialogContent asChild forceMount>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete} disabled={isLoading}>
                  {isLoading ? 'Deleting...' : 'Delete Account'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </motion.div>
          </AlertDialogContent>
        )}
      </AnimatePresence>
    </AlertDialog>
  )
}
