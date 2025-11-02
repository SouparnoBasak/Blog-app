<?php

namespace App\Http\Controllers;

use App\Models\TempImage;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Cloudinary\Configuration\Configuration;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Validator;

class TempImageController extends Controller
{
    public function store(Request $request){
        #return response()->json([
         #       'env'=>config('cloudinary.cloud_url')
          #  ]);
        #dd(env('CLOUDINARY_URL'));
        #$cloud_url="cloudinary://286799873931538:5PYAT6pURlJNVOcF4tuvYtUlEFw@dzf3tqgck";
        $validator=Validator::make($request->all(),[
            'image'=>'required|image'
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>false,
                'message'=> 'Pls fix the error',
                'errors'=>$validator->errors()
            ]);
        }

        try{
            
            $UploadFileUrl=Cloudinary::upload($request->file('image')->getRealPath(),[
                'folder'=>'Blog_uploads/temp_images'
            ])->getSecurePath();
            $tempImage=new TempImage();
            $tempImage->name=$UploadFileUrl;
            $tempImage->save();
        }catch(\Throwable $e){
            return response()->json([
            'status'=>false,
            'message'=>'Image Upload unsuccessful',
            'error'=>$e->getMessage(),
            ],500);
        }

        #$image->move(public_path('uploads/temp'),$imageName);

        return response()->json([
            'status'=>true,
            'message'=>'Image Uploaded successfuly',
            'image'=>$tempImage
        ]);
    }
}
