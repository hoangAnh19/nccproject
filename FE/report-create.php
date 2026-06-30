<?php include 'header.php'; ?>
<main class="main-container pl-[280px]">
    <?php include 'sidebar.php'; ?>
    <div class="main-content p-10">
        <div class="flex items-center justify-between border-b border-solid border-[#e2e8f0] pb-10 mb-10">
            <div class="block">
                <div class="page-title">Thêm nhà cung cấp mới</div>
            </div>
        </div>

        <div class="block overflow-hidden rounded-4 p-6 bg-white border border-solid border-[#e2e8f0]">
            <div class="grid grid-cols-3 gap-x-6 gap-y-6">
                <div class="item">
                    <label class="block font-bold text-[14px] text-blue mb-2">Tên nhà cung cấp *</label>
                    <input type="text" placeholder="" class="txt_field h-10 px-5 w-full rounded-2 outline-none border border-solid border-[#ebebeb]">
                </div>
                <div class="item">
                    <label class="block font-bold text-[14px] text-blue mb-2">Mã cung cấp *</label>
                    <input type="text" placeholder="" class="txt_field h-10 px-5 w-full rounded-2 outline-none border border-solid border-[#ebebeb]">
                </div>
                <div class="item">
                    <label class="block font-bold text-[14px] text-blue mb-2">Mã số thuế</label>
                    <input type="text" placeholder="" class="txt_field h-10 px-5 w-full rounded-2 outline-none border border-solid border-[#ebebeb]">
                </div>
                <div class="item col-span-3">
                    <label class="block font-bold text-[14px] text-blue mb-2">Loại hình áp dụng</label>
                    <ul class="flex items-center gap-6">
                        <li class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" id="1001">
                            <label for="1001" class="cursor-pointer">Hàng hóa</label>
                        </li>
                        <li class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" id="1002">
                            <label for="1002" class="cursor-pointer">TV</label>
                        </li>
                        <li class="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" id="1003">
                            <label for="1003" class="cursor-pointer">PTV</label>
                        </li>
                    </ul>
                </div>
                <div class="item col-span-3">
                    <label class="block font-bold text-[14px] text-blue mb-2">Mô tả chi tiết / Ghi chú</label>
                    <textarea class="txt_field h-[100px] px-5 py-2 w-full rounded-2 outline-none border border-solid border-[#ebebeb]"></textarea>
                </div>
                <div class="item col-span-3">
                    <div class="text-right">
                        <input type="submit" value="Thêm Nhà Cung Cấp" class="bg-blue text-white !px-6 !py-3 font-bold !rounded-3">
                    </div>
                </div>
            </div>
        </div>
    </div>
</main>
<?php include 'footer.php'; ?>
