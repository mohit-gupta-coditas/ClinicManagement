import { MANAGE_ROLE } from "../../app.types.js";
import { customRouter } from "../../routes/custom.router.js";
import { uploadToS3 } from "../../utils/aws.helper.js";
import { ResponseHandler } from "../../utils/response.handler.js";
import { body, params, query } from "../../utils/validate.request.js";
import attachmentService from "./attachment.service.js";
import { ZAttachment, ZAttachmentOptions } from "./attachments.types.js";

const router = customRouter();

// router.post(
//   '/',
//   {
//     isPermitted: MANAGE_ROLE.pick('patient')
//   },
//   uploadToS3.fields([
//   { name: 'identification', maxCount: 1 },
//   { name: 'insauranceCard', maxCount: 1 },
//   { name: 'priorReports', maxCount: 10 }
//   ]),
//   async (req, res, next) => {
//     try {
//       console.log(req.files);
//       const result = await attachmentService.createAttachment(req.files);
//       res.send(new ResponseHandler(result));
//     } catch(err) {
//       next(err);
//     }
//   }
// )

router.post(
  '/uploadSingle',
  {
    isPermitted: MANAGE_ROLE.pick('patient')
  },
  uploadToS3.single('document'),
  body(ZAttachment.pick({
    type: true,
  })),
  async (req, res, next) => {
    try {
      const results = await attachmentService.createAttachment((req.file as any).key, req.body.type, req.payload);
      res.send(new ResponseHandler(results));
    } catch(err) {  
      next(err);
    }
  }
)

router.post(
   '/uploadMultiple',
  {
    isPermitted: MANAGE_ROLE.pick('patient')
  },
  uploadToS3.array('reports'),
  async (req, res, next) => {
    try {
      const results = await attachmentService.createManyAttachments((req.files as any).map((r: any) => r.key), req.body.type, req.payload);
      res.send(new ResponseHandler(results));
    } catch(err) {  
      next(err);
    }
  }
);

router.get(
  '/',
  {
    isPermitted: MANAGE_ROLE.pick(
      'patient',
      'clinician'
    )
  },
  query(ZAttachmentOptions),
  body(ZAttachment.pick({patientId:true})),
  async (req, res, next) => {
    try {
      const results = await attachmentService.getAllAttachments(req.options, req.body.patiendId as string);
      res.send(new ResponseHandler(results));
    } catch(err) {  
      next(err);
    }
  }
)

router.get(
  '/:id',
  {
    isPermitted: MANAGE_ROLE.pick(
      'patient',
      'clinician'
    )
  },
  params(ZAttachment.pick({id: true})),
  body(ZAttachment.pick({patientId: true})),
  async (req, res, next) => {
    try {
      const results = await attachmentService.getAttachment({
        id: req.params.id as string,
        ...req.body
      });
      res.send(new ResponseHandler(results));
    } catch(err) {  
      next(err);
    }
  }
)

router.delete(
  '/:id',
  {
    isPermitted: MANAGE_ROLE.pick('patient')
  },
  params(ZAttachment.pick({id: true})),
  async (req, res, next) => {
    try {
      const result = await attachmentService.deleteAttachment(req.params.id as string);
      res.send(new ResponseHandler(result));
    } catch(err) {
      next(err);
    }
  }
)


export default router.setRouter('/attachements');