'use strict';

let req = {
               method:'GET',
               path: '/fizz/buzz',
           };

           return router.route(req, res)
            .then( () => {
                expect(writeHead).toHaveBeenCalledWith(404);
            });

       });
