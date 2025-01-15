import Swal from "sweetalert2";

export const LoadingDataHelper = async (
    title: string, 
    isAuthenticated: boolean, 
    externalFunction: () => Promise<void>) => {
    await Swal.fire({
      icon: 'info',
      title: title,
      showCancelButton: false,
      showConfirmButton: false,
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();
        if (isAuthenticated) {
         await externalFunction();
        }
        Swal.close()
      }
    }).then(() => {
      Swal.close();
    })
  }