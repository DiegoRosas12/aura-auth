import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useProfile } from '@application/hooks/useProfile'
import { MainLayout } from '../components/MainLayout'
import { Card, CardContent, CardHeader, CardTitle } from '../components/Card'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import { Alert } from '../components/Alert'
import { Spinner } from '../components/Spinner'
import { profileUpdateSchema, type ProfileUpdateFormData } from '@domain/validation/authSchemas'

export const ProfilePage = () => {
  const { profile, isLoading, error, fetchProfile, updateProfile, clearError } = useProfile()
  const [isEditing, setIsEditing] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileUpdateFormData>({
    resolver: zodResolver(profileUpdateSchema),
    mode: 'onChange',
  })

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  useEffect(() => {
    if (profile) {
      reset({
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
      })
    }
  }, [profile, reset])

  const onSubmit = async (data: ProfileUpdateFormData) => {
    clearError()
    setSuccessMessage(null)

    try {
      await updateProfile(data)
      setSuccessMessage('Profile updated successfully!')
      setIsEditing(false)
    } catch (err) {
      // Error handled by useProfile
    }
  }

  const handleCancel = () => {
    if (profile) {
      reset({
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
      })
    }
    setIsEditing(false)
    clearError()
  }

  if (isLoading && !profile) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[400px]">
          <Spinner size="lg" />
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto space-y-6 m-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="mt-2 text-gray-600">Manage your personal information</p>
        </div>

        {successMessage && (
          <Alert variant="success" onClose={() => setSuccessMessage(null)}>
            {successMessage}
          </Alert>
        )}

        {error && (
          <Alert variant="error" onClose={clearError}>
            {error}
          </Alert>
        )}

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Personal Information</CardTitle>
              {!isEditing && (
                <Button onClick={() => setIsEditing(true)} variant="outline" size="sm">
                  Edit Profile
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="First Name"
                  type="text"
                  {...register('firstName')}
                  error={errors.firstName?.message}
                  disabled={!isEditing}
                />

                <Input
                  label="Last Name"
                  type="text"
                  {...register('lastName')}
                  error={errors.lastName?.message}
                  disabled={!isEditing}
                />
              </div>

              <Input
                label="Email"
                type="email"
                {...register('email')}
                error={errors.email?.message}
                disabled={!isEditing}
              />

              {isEditing && (
                <div className="flex space-x-3 pt-4">
                  <Button type="submit" isLoading={isLoading}>
                    Save Changes
                  </Button>
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">User ID</label>
                <p className="mt-1 text-sm text-gray-900 font-mono">{profile?.id}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Account Created</label>
                <p className="mt-1 text-sm text-gray-900">{profile?.createdAt.toLocaleString()}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500">Last Updated</label>
                <p className="mt-1 text-sm text-gray-900">{profile?.updatedAt.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
