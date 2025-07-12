import { useForm } from "react-hook-form";
import useAuth from "../../../../hooks/useAuth";

const CreateSession = () => {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const imageUrl = "image.jpg";
    const newSession = {
      ...data,
      tutorName: user?.displayName,
      tutorEmail: user?.email,
      registrationStartDate: new Date(data.registrationStartDate).toISOString(),
      registrationEndDate: new Date(data.registrationEndDate).toISOString(),
      classStartDate: new Date(data.classStartDate).toISOString(),
      classEndDate: new Date(data.classEndDate).toISOString(),
      registrationFee: 0,
      bannerImage: imageUrl,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    console.log("New Session:", newSession);
    // Send newSession to your backend via Axios
    reset();
  };

  return (
    <div className="bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 min-h-screen py-10">
      <div className="max-w-4xl mx-auto bg-white dark:bg-base-300 p-8 shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center mb-6 text-primary">
          Create a New Study Session
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Session Title */}
          <div>
            <label className="block font-medium mb-1">Session Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="Enter session title"
              className="input input-bordered w-full dark:bg-gray-800"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">Title is required</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium mb-1">
              Session Description
            </label>
            <textarea
              {...register("description", { required: true })}
              placeholder="Write session details"
              className="textarea textarea-bordered w-full dark:bg-gray-800"
              rows={4}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">Description is required</p>
            )}
          </div>

          {/* Tutor Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Tutor Name</label>
              <input
                type="text"
                value={user?.displayName}
                readOnly
                disabled
                className="input input-bordered w-full bg-gray-100 dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Tutor Email</label>
              <input
                type="email"
                value={user?.email}
                readOnly
                disabled
                className="input input-bordered w-full bg-gray-100 dark:bg-gray-700"
              />
            </div>
          </div>

          {/* Dates and Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">
                Registration Start Date
              </label>
              <input
                type="date"
                {...register("registrationStartDate", { required: true })}
                className="input input-bordered w-full dark:bg-gray-800"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                Registration End Date
              </label>
              <input
                type="date"
                {...register("registrationEndDate", { required: true })}
                className="input input-bordered w-full dark:bg-gray-800"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Class Start Date</label>
              <input
                type="date"
                {...register("classStartDate", { required: true })}
                className="input input-bordered w-full dark:bg-gray-800"
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Class End Date</label>
              <input
                type="date"
                {...register("classEndDate", { required: true })}
                className="input input-bordered w-full dark:bg-gray-800"
              />
            </div>
          </div>

          {/* Duration */}
          <div>
            <label className="block font-medium mb-1">Session Duration</label>
            <input
              type="text"
              {...register("sessionDuration", { required: true })}
              placeholder="e.g. 4 weeks"
              className="input input-bordered w-full dark:bg-gray-800"
            />
            {errors.sessionDuration && (
              <p className="text-red-500 text-sm">Duration is required</p>
            )}
          </div>

          {/* Registration Fee */}
          <div>
            <label className="block font-medium mb-1">Registration Fee</label>
            <input
              type="text"
              value="0"
              readOnly
              disabled
              className="input input-bordered w-full bg-gray-100 dark:bg-gray-700"
            />
          </div>

          {/* Hidden Status */}
          <input type="hidden" value="pending" {...register("status")} />

          {/* Banner Image Upload */}
          <div>
            <label className="block font-medium mb-1">
              Session Banner Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("bannerImage", { required: true })}
              className="file-input file-input-bordered w-full dark:bg-gray-800"
            />
            {errors.bannerImage && (
              <p className="text-red-500 text-sm">Banner image is required</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button type="submit" className="btn btn-primary w-full">
              Submit Session
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSession;
