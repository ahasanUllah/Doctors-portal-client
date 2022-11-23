import React from 'react';

const ConfirmationModal = ({ setDeletingDoctor, deletingDoctor, handleDelete }) => {
   console.log(deletingDoctor);

   return (
      <div>
         {/* The button to open modal */}
         {/* Put this part before </body> tag */}
         <input type="checkbox" id="confirmation-modal" className="modal-toggle" />;
         <div className="modal">
            <div className="modal-box">
               <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
               <p className="py-4">
                  You've been selected for a chance to get one year of subscription to use Wikipedia for free!
               </p>
               <div className="modal-action">
                  <label onClick={() => handleDelete(deletingDoctor._id)} className="btn">
                     Confirm
                  </label>
                  <label onClick={() => setDeletingDoctor(null)} className="btn">
                     close
                  </label>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ConfirmationModal;
